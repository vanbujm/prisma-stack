import path from 'path';
import { makeExecutableSchema, makeRemoteExecutableSchema, mergeSchemas } from 'apollo-server';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { HttpLink } from 'apollo-link-http';
import { applyMiddleware } from 'graphql-middleware';
import { importSchema } from 'graphql-import';
import cors from 'cors';
import { json, text, urlencoded } from 'body-parser';
import helmet from 'helmet';
import expressJwt from 'express-jwt';
import { prisma } from '../generated/prisma-client';
import { typeDefs as prismaTypeDefs } from '../generated/prisma-client/prisma-schema';
import Queue from 'bull';
import logging from './util/logging';
import resolvers from './graphql/resolvers';

import { createArenaHandler, validateRedisConfig } from './util/util';
import { permissions } from './graphql/graphql-auth';

const run = async (): Promise<void> => {
  const { port: redisPort, host: redisHost } = validateRedisConfig();
  const defaultQueue = new Queue('default queue', `redis://${redisHost}:${redisPort}`);
  const app = express();

  const authMiddleware = expressJwt({
    secret: process.env.APP_SECRET || '',
    credentialsRequired: false
  });

  app.use(json());
  app.use(authMiddleware);
  app.use(text({ type: 'text/xml' }));
  app.use(urlencoded({ extended: true }));
  app.use(logging);
  app.use(helmet());
  app.use(cors());
  app.use('/', createArenaHandler(redisHost, redisPort));

  // 1. Create Apollo Link that's connected to the underlying GraphQL API
  const link = new HttpLink({
    fetch,
    uri: 'http://localhost:4466'
  });

  // 3. Create the executable schema based on schema definition and Apollo Link
  const prismaSchema = makeRemoteExecutableSchema({
    link,
    schema: prismaTypeDefs
  });

  const typeDefs = importSchema(path.join(__dirname, 'graphql/schema.graphql'));

  const schema = applyMiddleware(
    mergeSchemas({
      schemas: [
        prismaSchema,
        makeExecutableSchema({
          resolvers,
          typeDefs
        })
      ]
    }),
    permissions
  );
  const server = new ApolloServer({
    schema,
    context: ({ req }: { req: express.Request }) => ({
      prisma,
      user: req.user
    })
  });

  server.applyMiddleware({ app, path: '/graphql' });

  app.get('/auspost', async (_req, res) => {
    defaultQueue.add({ auspostID: '1234' });
    res.send('Aus Post job queued');
  });

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 GraphQl Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

run();
