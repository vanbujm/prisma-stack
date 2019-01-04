import { ApolloContext, AuthPayload, UserCredentials } from '../../types';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserCreateInput } from '../../../generated/prisma-client';
import { getAppSecret } from '../../util/util';

const tokenFields = ({ id, email }: { id?: string; email?: string }) => ({ email, userId: id });

export const auth = {
  signup: async (
    _parent: any,
    { password, email }: UserCreateInput,
    { prisma: { createUser } }: ApolloContext
  ): Promise<AuthPayload> => {
    const saltedPassword = await hash(password, 10);
    const user = await createUser({ email, password: saltedPassword });

    return {
      user,
      token: sign(tokenFields(user), getAppSecret())
    };
  },

  login: async (_parent: any, { email, password }: UserCredentials, { prisma: { user } }: ApolloContext) => {
    const userFromDb = await user({ email });

    if (!userFromDb) throw new Error(`No user found for email: ${email}`);

    const passwordValid = await compare(password, userFromDb.password);

    if (!passwordValid) throw new Error('Invalid password');

    return {
      user: userFromDb,
      token: sign(tokenFields(userFromDb), getAppSecret())
    };
  }
};
