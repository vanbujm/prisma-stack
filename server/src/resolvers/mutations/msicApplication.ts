import { AuthorizedApolloContext } from '../../types';
import { createStateMachine } from '../../util';
import { MsicApplicationCreateInput } from '../../../generated/prisma-client';

export const createMsicApplication = (
  _parent: any,
  { firstName, lastName, address, dob }: MsicApplicationCreateInput,
  { prisma: { createMsicApplication }, user }: AuthorizedApolloContext
) => {
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
) => {
  const msicApplication = await prisma.msicApplication({ id });
  const msicStateMachine = createStateMachine(msicApplication, { prisma });
  return await msicStateMachine.submit();
};
