import { ApolloContext, AuthorizedApolloContext } from '../types';
import mutations from './mutations';
import { User } from '../../generated/prisma-client';

const resolvers = {
  Query: {
    me: (_parent: any, _args: any, context: AuthorizedApolloContext) => {
      return context.prisma.user({ id: context.user.userId });
    }
  },
  Mutation: mutations,
  User: {
    msicApplications: ({ id }: User, {}, { prisma: { user } }: ApolloContext) => user({ id }).MsicApplications()
  },
  MsicApplication: {
    user: ({ id }: User, {}, { prisma: { msicApplication } }: ApolloContext) => {
      return msicApplication({ id }).user();
    }
  }
};

export default resolvers;
