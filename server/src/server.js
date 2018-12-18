import { prisma } from '../generated/prisma-client/index';
import { makeExecutableSchema } from 'apollo-server';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { json, urlencoded, text } from 'body-parser';
import helmet from 'helmet';

import logging from './logging';

import typeDefs from './schema.graphql';
import resolvers from './resolvers';

const app = express();

app.use(json());
app.use(text({ type: 'text/xml' }));
app.use(urlencoded({ extended: true }));
app.use(logging);
app.use(helmet());
app.use(cors());

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

server.applyMiddleware({ app, path: '/' });

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
