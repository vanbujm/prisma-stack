import { prisma } from '../generated/prisma-client/index';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';

import typeDefs from './schema.graphql';
import resolvers from './resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: {
    prisma
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
