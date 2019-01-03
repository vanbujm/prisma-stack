import { makeExecutableSchema } from 'apollo-server';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { json, text, urlencoded } from 'body-parser';
import helmet from 'helmet';
import expressJwt from 'express-jwt';
import { prisma } from '../generated/prisma-client';
import Queue from 'bull';
import Arena from 'bull-arena';

import logging from './logging';
import resolvers from './resolvers';
// @ts-ignore (ts doesn't understand .graphql files)
import typeDefs from './schema.graphql';
import { validateRedisConfig } from './util';

const run = async (): Promise<void> => {
  const { port, host } = validateRedisConfig();

  const defaultQueue = new Queue('default queue', `redis://${host}:${port}`);
  const app = express();

  const authMiddleware = expressJwt({
    secret: process.env.APP_SECRET || '',
    credentialsRequired: false
  });

  const arenaConfig = Arena(
    {
      queues: [
        {
          // Name of the bull queue, this name must match up exactly with what you've defined in bull.
          name: 'default-queue',

          // Hostname or queue prefix, you can put whatever you want.
          hostId: 'bull-queues',

          // Redis auth.
          redis: {
            port,
            host
          }
        }
      ]
    },
    {
      basePath: '/arena',
      disableListen: true
    }
  );

  app.use(json());
  app.use(authMiddleware);
  app.use(text({ type: 'text/xml' }));
  app.use(urlencoded({ extended: true }));
  app.use(logging);
  app.use(helmet());
  app.use(cors());
  app.use('/', arenaConfig);

  const schema = makeExecutableSchema({
    resolvers,
    typeDefs
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }: { req: express.Request }) => ({
      prisma,
      user: req.user
    })
  });

  server.applyMiddleware({ app, path: '/api' });

  app.get('/auspost', async (_req, res) => {
    defaultQueue.add({ auspostID: '1234' });
    res.send('Aus Post job queued');
  });

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 GraphQl Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

run();
