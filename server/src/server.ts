import path from 'path';
import { makeExecutableSchema } from 'apollo-server';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { importSchema } from 'graphql-import';
import cors from 'cors';
import { json, text, urlencoded } from 'body-parser';
import helmet from 'helmet';
import expressJwt from 'express-jwt';
import { prisma } from '../generated/prisma-client';
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

  const typeDefs = importSchema(path.join(__dirname, 'graphql/schema.graphql'));
  const schema = applyMiddleware(
    makeExecutableSchema({
      resolvers,
      typeDefs
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
