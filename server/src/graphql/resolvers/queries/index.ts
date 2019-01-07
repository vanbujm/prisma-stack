import { AuthorizedApolloContext } from '../../types';

export default {
  me: (_parent: any, _args: any, context: AuthorizedApolloContext) => {
    return context.prisma.user({ id: context.user.userId });
  }
};
