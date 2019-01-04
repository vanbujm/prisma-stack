// TODO: Add types for javascript-state-machine.
// @types/javascript-state-machine is for an older version
// @ts-ignore
import StateMachine from 'javascript-state-machine';
import { MsicApplication } from '../../generated/prisma-client';
import { ApolloContext, FsmMethodArgs, MsicStatusHash } from '../types';

export const msicStates: MsicStatusHash = {
  draft: 'DRAFT',
  submittedToAuspost: 'SUBMITTED_TO_AUSPOST',
  auspostVerified: 'AUSPOST_VERIFIED',
  auspostRejected: 'AUSPOST_REJECTED',
  awaitingPickup: 'AWAITING_PICKUP',
  complete: 'COMPLETE',
  error: 'ERROR',
  cancelled: 'CANCELLED'
};

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
      onEnterState({ from, to }: FsmMethodArgs): Promise<MsicApplication> | undefined {
        if (!Object.values(msicStates).includes(from) || !Object.values(msicStates).includes(to)) return;
        try {
          // @ts-ignore
          return this.prisma.updateMsicApplication({
            data: {
              status: to
            },
            where: {
              // @ts-ignore
              id: this.msicId
            }
          });
        } catch (e) {
          console.log(e);
          throw new Error('Invalid transition');
        }
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
