import { RedisOptions } from './types';

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export const validateRedisConfig = (): RedisOptions => {
  const { REDIS_PORT, REDIS_HOST } = process.env;
  if (REDIS_PORT === undefined || REDIS_HOST === undefined) {
    throw Error('REDIS_PORT and REDIS_HOST env variables are required ');
  }
  if (isNaN(Number(REDIS_PORT))) throw Error('REDIS_PORT must be a number');

  return { host: REDIS_HOST, port: REDIS_PORT };
};
