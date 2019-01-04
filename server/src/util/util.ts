import { RedisOptions } from '../types';
import Arena from 'bull-arena';
import { AppSecretRequiredError, NaNError, RedisConfigRequiredError } from '../errors';

export const getAppSecret = (): string => {
  if (!process.env.APP_SECRET) throw new AppSecretRequiredError();
  return process.env.APP_SECRET;
};

export const validateRedisConfig = (): RedisOptions => {
  const { REDIS_PORT, REDIS_HOST } = process.env;
  if (REDIS_PORT === undefined || REDIS_HOST === undefined) {
    throw new RedisConfigRequiredError();
  }
  if (isNaN(Number(REDIS_PORT))) throw new NaNError('REDIS_PORT');

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
