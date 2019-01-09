import { allow, deny, or, rule, shield } from 'graphql-shield';
import { AuthorizedApolloContext, UserMsicIdsFragmentResult } from './types';
import { prisma, User } from '../../generated/prisma-client';
import { ApolloContext, MsicID } from '../types';

const userMsicIdsFragment = `
  fragment UserMsicIds on User {
    MsicApplications {
      id
    }
  }
`;

const fetchMsicIdsForUser = async (userId: string): Promise<string[]> => {
  const msicApplicationQueryResult: UserMsicIdsFragmentResult = await prisma
    .user({ id: userId })
    .$fragment(userMsicIdsFragment);
  return msicApplicationQueryResult.MsicApplications.map(({ id }: MsicID) => id);
};

const isAuthenticated = rule({ cache: 'contextual' })(async (_parent, _args, context: ApolloContext) => {
  return !!context.user;
});

const isOwnMsic = rule({ cache: 'strict', fragment: 'fragment MsicID on MsicApplication { id }' })(
  async ({ id: msicId }: MsicID, _args, context: AuthorizedApolloContext): Promise<boolean> => {
    return (await fetchMsicIdsForUser(context.user.userId)).includes(msicId);
  }
);

const isAdmin = rule({ cache: 'strict' })(
  async (_parents, _args, context: AuthorizedApolloContext): Promise<boolean> => {
    return false;
  }
);

const isOwnUser = rule({ cache: 'strict', fragment: 'fragment UserID on User { id }' })(
  async ({ id }: Pick<User, 'id'>, _args, context: AuthorizedApolloContext): Promise<boolean> => {
    return context.user.userId === id;
  }
);

// Permissions
export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      users: allow
    },
    Mutation: {
      signup: isAuthenticated,
      login: allow,
      createMsicApplication: isAuthenticated,
      submitMsicApplication: isAuthenticated
    },
    AuthPayload: allow,
    MsicApplication: isOwnMsic,
    User: or(isAdmin, isOwnUser)
  },
  { fallbackRule: deny, allowExternalErrors: process.env.NODE_ENV === 'development' }
);
