import { Prisma } from '../generated/prisma-client';
interface User {
  readonly userId: string;
  readonly email: string;
}

interface ApolloContext {
  prisma: Prisma;
  user: User;
}
