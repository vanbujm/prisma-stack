import { MsicApplicationStatus, Prisma, User } from '../../generated/prisma-client';

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

export interface AuthorizedApolloContext extends ApolloContext {
  user: UserAuthDetails;
}

export interface RedisOptions {
  port: string;
  host: string;
}

export interface FsmMethodArgs {
  transition: string;
  from: MsicApplicationStatus;
  to: MsicApplicationStatus;
}

interface IdObject {
  id: string;
}

export interface UserMsicIdsFragmentResult {
  MsicApplications: IdObject[];
}

export interface MsicStatusHash {
  draft: MsicApplicationStatus;
  submittedToAuspost: MsicApplicationStatus;
  auspostVerified: MsicApplicationStatus;
  auspostRejected: MsicApplicationStatus;
  awaitingPickup: MsicApplicationStatus;
  complete: MsicApplicationStatus;
  error: MsicApplicationStatus;
  cancelled: MsicApplicationStatus;
}
