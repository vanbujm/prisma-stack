import _ from 'lodash';
import { AuthorizedApolloContext } from '../../types';
import { createStateMachine } from '../../util/finite-state-machine';
import { MsicApplication, MsicApplicationCreateInput } from '../../../generated/prisma-client';

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
    throw new Error(
      `MSIC application cannot be submitted. Application is currently in the "${_.lowerCase(
        msicStateMachine.state
      )}" stage.`
    );
  }

  return await msicStateMachine.submit();
};
