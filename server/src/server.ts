import { makeExecutableSchema } from 'apollo-server';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { json, urlencoded, text } from 'body-parser';
import helmet from 'helmet';
import expressJwt from 'express-jwt';
import { prisma } from '../generated/prisma-client';
import PgBoss from 'pg-boss';

import logging from './logging';
// @ts-ignore (ts doesn't understand .graphql files)
import typeDefs from './schema.graphql';
import resolvers from './resolvers';

const run = async (): Promise<void> => {
  const app = express();
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;
  const options = {
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    poolSize: 5
  };
  const boss = new PgBoss(options);

  boss.on('error', error => console.error(error));

  await boss.start();

  const queue = 'some-queue';

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

  const schema = makeExecutableSchema({
    resolvers,
    typeDefs
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }: { req: express.Request }) => ({
      ...req,
      prisma
    })
  });

  server.applyMiddleware({ app, path: '/api' });

  app.get('/auspost', async (_req, res) => {
    await boss.publish(queue, { auspostID: '1234' });
    res.send('Aus Post job queued');
  });

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 GraphQl Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

run();
