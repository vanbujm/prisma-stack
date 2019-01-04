import { User } from '../../../generated/prisma-client';
import { ApolloContext } from '../../types';

export default {
  User: {
    msicApplications: ({ id }: User, {}, { prisma: { user } }: ApolloContext) => user({ id }).MsicApplications()
  },
  MsicApplication: {
    user: ({ id }: User, {}, { prisma: { msicApplication } }: ApolloContext) => {
      return msicApplication({ id }).user();
    }
  }
};
