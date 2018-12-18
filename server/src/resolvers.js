import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getUserId } from './util';

const appSecret = process.env.APP_SECRET;
const tokenFields = ({ id, email }) => ({ userId: id, email });

const auth = {
  signup: async (parent, args, context) => {
    const password = await hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });

    return {
      token: sign(tokenFields(user), appSecret),
      user
    };
  },

  login: async (parent, { email, password }, context) => {
    const user = await context.prisma.user({ email });

    if (!user) throw new Error(`No user found for email: ${email}`);

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) throw new Error('Invalid password');

    return {
      token: sign(tokenFields(user), appSecret),
      user
    };
  }
};

const resolvers = {
  Query: {
    MsicApplication(parent, { id }, context) {
      return context.prisma.msicApplication({ id });
    },
    me(parent, args, context) {
      const id = getUserId(context);
      return context.prisma.user({ id });
    },
    users(parent, args, context) {
      return context.prisma.users();
    }
  },
  Mutation: {
    ...auth,
    createMsicApplication: (parent, args, context) =>
      context.prisma.createMsicApplication({
        ...args,
        user: { connect: { id: args.user } }
      })
  },
  User: {
    msicApplications: ({ id }, args, context) => context.prisma.user({ id }).MsicApplications()
  },
  MsicApplication: {
    user: ({ id }, args, context) => context.prisma.msicApplication({ id }).user()
  }
};

export default resolvers;
