import { AuthError } from '../util';
import { ApolloContext } from '../types';
import mutations from './mutations';
import { User } from '../../generated/prisma-client';

const resolvers = {
  Query: {
    me: (_parent: any, _args: any, context: ApolloContext) => {
      if (context.user === undefined) throw new AuthError();
      return context.prisma.user({ id: context.user.userId });
    }
  },
  Mutation: mutations,
  User: {
    msicApplications: ({ id }: User, {}, { prisma: { user } }: ApolloContext) => user({ id }).MsicApplications()
  },
  MsicApplication: {
    user: ({ id }: User, {}, { prisma: { msicApplication } }: ApolloContext) => {
      // console.log(id, msicApplication({ id }).user());
      return msicApplication({ id }).user();
    }
  }
};

export default resolvers;
