import { prisma } from '../generated/prisma-client/index';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';

process.env.APP_SECRET = 'SECRET';

import typeDefs from './schema.graphql';
import resolvers from './resolvers';


const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
