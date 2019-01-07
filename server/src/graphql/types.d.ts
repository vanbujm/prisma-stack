import { MsicApplicationStatus, User } from '../../generated/prisma-client';
import { ApolloContext } from '../types';

export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export interface UserAuthDetails {
  readonly userId: string;
  readonly email: string;
}

export interface AuthorizedApolloContext extends ApolloContext {
  readonly user: UserAuthDetails;
}

interface IdObject {
  readonly id: string;
}

export interface UserMsicIdsFragmentResult {
  readonly MsicApplications: IdObject[];
}

export interface MsicStatusHash {
  readonly draft: MsicApplicationStatus;
  readonly submittedToAuspost: MsicApplicationStatus;
  readonly auspostVerified: MsicApplicationStatus;
  readonly auspostRejected: MsicApplicationStatus;
  readonly awaitingPickup: MsicApplicationStatus;
  readonly complete: MsicApplicationStatus;
  readonly error: MsicApplicationStatus;
  readonly cancelled: MsicApplicationStatus;
}
