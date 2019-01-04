import StateMachine from 'javascript-state-machine';
import { ApolloContext, FsmMethodArgs, RedisOptions } from './types';
import { MsicApplication } from '../generated/prisma-client';

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export const validateRedisConfig = (): RedisOptions => {
  const { REDIS_PORT, REDIS_HOST } = process.env;
  if (REDIS_PORT === undefined || REDIS_HOST === undefined) {
    throw Error('REDIS_PORT and REDIS_HOST env variables are required ');
  }
  if (isNaN(Number(REDIS_PORT))) throw Error('REDIS_PORT must be a number');

  return { host: REDIS_HOST, port: REDIS_PORT };
};

const msicStates = [
  'DRAFT',
  'SUBMITTED_TO_AUSPOST',
  'AUSPOST_VERIFIED',
  'AUSPOST_REJECTED',
  'AWAITING_PICKUP',
  'COMPLETE',
  'ERROR',
  'CANCELLED'
];

const transitions = [
  { name: 'submit', from: 'DRAFT', to: 'SUBMITTED_TO_AUSPOST' },
  { name: 'auspostVerify', from: 'SUBMITTED_TO_AUSPOST', to: 'AUSPOST_VERIFIED' },
  { name: 'auspostReject', from: 'SUBMITTED_TO_AUSPOST', to: 'AUSPOST_REJECTED' },
  { name: 'approveCheck', from: 'AUSPOST_VERIFIED', to: 'AUSCHECK_VERIFIED' },
  { name: 'rejectCheck', from: 'AUSPOST_VERIFIED', to: 'AUSCHECK_REJECTED' },
  { name: 'awaitPickup', from: 'AUSCHECK_VERIFIED', to: 'AWAITING_PICKUP' },
  { name: 'complete', from: 'AWAITING_PICKUP', to: 'COMPLETE' },
  {
    name: 'error',
    from: [
      'DRAFT',
      'SUBMITTED_TO_AUSPOST',
      'AUSPOST_VERIFIED',
      'AUSPOST_REJECTED',
      'AUSCHECK_VERIFIED',
      'AUSCHECK_REJECTED',
      'AWAITING_PICKUP',
      'COMPLETE',
      'CANCELLED'
    ],
    to: 'ERROR'
  },
  {
    name: 'cancel',
    from: [
      'DRAFT',
      'SUBMITTED_TO_AUSPOST',
      'AUSPOST_VERIFIED',
      'AUSPOST_REJECTED',
      'AUSCHECK_VERIFIED',
      'AUSCHECK_REJECTED',
      'AWAITING_PICKUP',
      'COMPLETE'
    ],
    to: 'CANCELLED'
  }
];

export const createStateMachine = (msicApplication: MsicApplication, context: ApolloContext) => {
  const msicStateMachine = StateMachine.factory({
    transitions,
    methods: {
      onEnterState({ transition, from, to }: FsmMethodArgs): Promise<MsicApplication> | undefined {
        if (!msicStates.includes(from) || !msicStates.includes(to)) return;
        return this.prisma.updateMsicApplication({
          data: {
            status: to
          },
          where: {
            id: this.msicId
          }
        });
      }
    },
    data: ({ prisma }: ApolloContext) => ({
      prisma,
      msicId: msicApplication.id
    }),
    init: msicApplication.status
  });
  return new msicStateMachine(context);
};
