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

// import typeDefs from './schema.graphql';
import { validateRedisConfig } from './util';

const typeDefs = `
enum MsicApplicationStatus {
    DRAFT,
    SUBMITTED_TO_AUSPOST,
    AUSPOST_VERIFIED,
    AUSPOST_REJECTED,
    SUBMITTED_TO_AUSCHECK,
    AUSCHECK_VERIFIED,
    AUSCHECK_REJECTED,
    AWAITING_PICKUP,
    COMPLETE,
    ERROR,
    CANCELLED
}

type Query {
    me: User!
}

type Mutation {
    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createMsicApplication(firstName: String, lastName: String, address: String, dob: String): MsicApplication!
}

type User {
    id: ID!
    email: String
    msicApplications: [MsicApplication!]
}

type AuthPayload {
    token: String!
    user: User!
}

type MsicApplication {
    id: ID!
    status: MsicApplicationStatus!
    user: User!
    firstName: String
    lastName: String
    address: String
    dob: String
}
`;

const run = async (): Promise<void> => {
  const { port: redisPort, host: redisHost } = validateRedisConfig();

  const defaultQueue = new Queue('default queue', `redis://${redisHost}:${redisPort}`);
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
            port: redisPort,
            host: redisHost
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
