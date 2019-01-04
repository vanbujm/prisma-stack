import { ApolloContext } from '../../types';
import { AuthError, createStateMachine } from '../../util';
import { MsicApplicationCreateInput } from '../../../generated/prisma-client';

export const createMsicApplication = (
  _parent: any,
  { firstName, lastName, address, dob }: MsicApplicationCreateInput,
  { prisma: { createMsicApplication }, user }: ApolloContext
) => {
  if (user === undefined) throw new AuthError();
  return createMsicApplication({
    firstName,
    lastName,
    address,
    dob,
    user: { connect: { id: user.userId } }
  });
};

export const submitMsicApplication = async (_parent: any, { id }: { id: string }, { prisma, user }: ApolloContext) => {
  if (user === undefined) throw new AuthError();

  const recordedUser = await prisma.msicApplication({ id }).user();

  if (recordedUser.id !== user.userId) throw new AuthError();

  const msicApplication = await prisma.msicApplication({ id });
  const msicStateMachine = createStateMachine(msicApplication, { prisma });
  return await msicStateMachine.submit();
};
