import { RedisOptions } from '../types';
import Arena from 'bull-arena';

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export const getAppSecret = (): string => {
  if (!process.env.APP_SECRET) throw new AppSecretRequiredError();
  return process.env.APP_SECRET;
};

export const validateRedisConfig = (): RedisOptions => {
  const { REDIS_PORT, REDIS_HOST } = process.env;
  if (REDIS_PORT === undefined || REDIS_HOST === undefined) {
    throw Error('REDIS_PORT and REDIS_HOST env variables are required ');
  }
  if (isNaN(Number(REDIS_PORT))) throw Error('REDIS_PORT must be a number');

  return { host: REDIS_HOST, port: REDIS_PORT };
};

export const createArenaHandler = (host: string, port: string) =>
  Arena(
    {
      queues: [
        {
          // Name of the bull queue, this name must match up exactly with what you've defined in bull.
          name: 'default-queue',

          // Hostname or queue prefix, you can put whatever you want.
          hostId: 'bull-queues',

          // Redis auth.
          redis: {
            port: host,
            host: port
          }
        }
      ]
    },
    {
      basePath: '/arena',
      disableListen: true
    }
  );
