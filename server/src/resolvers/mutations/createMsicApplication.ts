import { ApolloContext } from '../../types';
import { AuthError } from '../../util';
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
