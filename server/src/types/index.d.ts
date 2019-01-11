import { MsicApplication, MsicApplicationStatus, Prisma } from '../../generated/prisma-client';
import { StateMachine, StateMachineFactoryConfig, Transition } from 'javascript-state-machine';
import { UserAuthDetails } from '../graphql/types';

export interface ApolloContext {
  readonly prisma: Prisma;
  readonly user?: UserAuthDetails;
}

export interface FsmMethodArgs {
  readonly transition: string;
  readonly from: MsicApplicationStatus;
  readonly to: MsicApplicationStatus;
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
  readonly methods: MsicMethods;
  readonly transitions: MsicTransition[];
  data(context: ApolloContext): MsicStateMachineContext;
  readonly init: MsicApplicationStatus;
}

export type MsicID = Pick<MsicApplication, 'id'>;
