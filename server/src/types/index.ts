import { Prisma } from '../../generated/prisma-client';

export interface User {
  readonly userId: string;
  readonly email: string;
}

export interface ApolloContext {
  prisma: Prisma;
  user?: User;
}
