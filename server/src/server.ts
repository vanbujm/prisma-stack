import { makeExecutableSchema } from 'apollo-server';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { json, urlencoded, text } from 'body-parser';
import helmet from 'helmet';
import expressJwt from 'express-jwt';
import { prisma } from '../generated/prisma-client';

import logging from './logging';
// @ts-ignore (ts doesn't understand .graphql files)
import typeDefs from './schema.graphql';
import resolvers from './resolvers';

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

server.applyMiddleware({ app, path: '/' });

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
