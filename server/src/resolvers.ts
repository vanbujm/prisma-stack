import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getUserId } from './util';
import { ApolloContext } from './types';

const appSecret = process.env.APP_SECRET || '';
const tokenFields = ({ id, email }: { id?: string; email?: string }) => ({ email, userId: id });

const auth = {
  signup: async (_parent: any, args: { password: string }, context: ApolloContext) => {
    const password = await hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });

    return {
      user,
      token: sign(tokenFields(user), appSecret)
    };
  },

  login: async (_parent: any, { email, password }: { email: string; password: string }, context: ApolloContext) => {
    const user = await context.prisma.user({ email });

    if (!user) throw new Error(`No user found for email: ${email}`);

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) throw new Error('Invalid password');

    return {
      user,
      token: sign(tokenFields(user), appSecret)
    };
  }
};

const resolvers = {
  Query: {
    MsicApplication(_parent: any, { id }: { id: string }, context: ApolloContext) {
      return context.prisma.msicApplication({ id });
    },
    me(_parent: any, _args: any, context: ApolloContext) {
      const id = getUserId(context);
      return context.prisma.user({ id });
    },
    users(_parent: any, _args: any, context: ApolloContext) {
      return context.prisma.users();
    }
  },
  Mutation: {
    ...auth,
    createMsicApplication: (_parent: any, args: { user: string }, context: ApolloContext) =>
      context.prisma.createMsicApplication({
        ...args,
        user: { connect: { id: args.user } }
      })
  },
  User: {
    msicApplications: ({ id }: { id: string }, {}, context: ApolloContext) =>
      context.prisma.user({ id }).MsicApplications()
  },
  MsicApplication: {
    user: ({ id }: { id: string }, {}, context: ApolloContext) => context.prisma.msicApplication({ id }).user()
  }
};

export default resolvers;
