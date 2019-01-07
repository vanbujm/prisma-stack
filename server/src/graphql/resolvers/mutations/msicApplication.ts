import _ from 'lodash';
import { AuthorizedApolloContext } from '../../types';
import { createStateMachine } from '../../../finite-state-machine';
import { MsicApplication, MsicApplicationCreateInput } from '../../../../generated/prisma-client';
import { InvalidTransitionError } from '../../../errors';

export const createMsicApplication = (
  _parent: any,
  { firstName, lastName, address, dob }: MsicApplicationCreateInput,
  { prisma: { createMsicApplication }, user }: AuthorizedApolloContext
): Promise<MsicApplication> => {
  return createMsicApplication({
    firstName,
    lastName,
    address,
    dob,
    user: { connect: { id: user.userId } }
  });
};

export const submitMsicApplication = async (
  _parent: any,
  { id }: { id: string },
  { prisma }: AuthorizedApolloContext
): Promise<MsicApplication> => {
  const msicApplication = await prisma.msicApplication({ id });
  const msicStateMachine = createStateMachine(msicApplication, { prisma });

  if (msicStateMachine.cannot('submit')) {
    throw new InvalidTransitionError(
      `MSIC application cannot be submitted. Application is currently in the "${_.lowerCase(
        msicStateMachine.state
      )}" stage.`
    );
  }

  return await msicStateMachine.submit();
};
