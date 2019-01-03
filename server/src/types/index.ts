import { Prisma, User } from '../../generated/prisma-client';

export interface AuthPayload {
  user: User;
  token: string;
}

export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export interface UserAuthDetails {
  readonly userId: string;
  readonly email: string;
}

export interface ApolloContext {
  prisma: Prisma;
  user?: UserAuthDetails;
}

export interface RedisOptions {
  port: string;
  host: string;
}
