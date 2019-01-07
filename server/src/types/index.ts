import { MsicApplication, MsicApplicationStatus, Prisma, User } from '../../generated/prisma-client';
import { StateMachine, StateMachineFactoryConfig, Transition } from 'javascript-state-machine';

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

interface IdObject {
  id: string;
}

export interface UserMsicIdsFragmentResult {
  MsicApplications: IdObject[];
}

export interface FsmMethodArgs {
  transition: string;
  from: MsicApplicationStatus;
  to: MsicApplicationStatus;
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

export type TransitionName =
  | 'submit'
  | 'auspostVerify'
  | 'auspostReject'
  | 'approveCheck'
  | 'rejectCheck'
  | 'awaitPickup'
  | 'complete'
  | 'error'
  | 'cancel';

export interface MsicTransition extends Transition {
  readonly name: TransitionName;
  readonly from: MsicApplicationStatus | MsicApplicationStatus[];
  readonly to: MsicApplicationStatus;
}

export interface MsicStateMachine extends StateMachine {
  cannot(transition: TransitionName): boolean;
  readonly state: MsicApplicationStatus;

  submit(): Promise<MsicApplication>;
  auspostVerify(): Promise<MsicApplication>;
  auspostReject(): Promise<MsicApplication>;
  approveCheck(): Promise<MsicApplication>;
  rejectCheck(): Promise<MsicApplication>;
  awaitPickup(): Promise<MsicApplication>;
  complete(): Promise<MsicApplication>;
  error(): Promise<MsicApplication>;
  cancel(): Promise<MsicApplication>;
}

interface MsicStateMachineContext {
  readonly prisma: Prisma;
  readonly msicId: string;
}

interface MsicMethods extends MsicStateMachineContext {
  onEnterState(): Promise<MsicApplication>;
}

export interface MsicStateMachineFactoryConfig extends StateMachineFactoryConfig {
  methods: MsicMethods;
  transitions: MsicTransition[];
  data(context: ApolloContext): MsicStateMachineContext;
  init: MsicApplicationStatus;
}
