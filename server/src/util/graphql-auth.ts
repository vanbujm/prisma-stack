import { allow, and, deny, rule, shield } from 'graphql-shield';
import { AuthorizedApolloContext, UserMsicIdsFragmentResult } from '../types';
import { prisma } from '../../generated/prisma-client';

const isAuthenticated = rule()(async (_parent, _args, context: AuthorizedApolloContext) => {
  return context.user !== null;
});

const fragment = `
  fragment UserMsicIds on User {
    MsicApplications {
      id
    }
  }
`;

const isOwnMsic = rule()(
  async (_parent, { id }: { id: string }, context: AuthorizedApolloContext): Promise<boolean> => {
    if (!context.user) return false;
    const msicApplicationQueryResult: UserMsicIdsFragmentResult = await prisma
      .user({ id: context.user.userId })
      .$fragment(fragment);
    const msicIds = msicApplicationQueryResult.MsicApplications.map(({ id }: { id: string }) => id);
    return msicIds.includes(id);
  }
);

// Permissions

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated
    },
    Mutation: {
      signup: allow,
      login: allow,
      createMsicApplication: isAuthenticated,
      submitMsicApplication: and(isAuthenticated, isOwnMsic)
    },
    AuthPayload: allow,
    MsicApplication: allow,
    User: allow
  },
  { fallbackRule: deny }
);