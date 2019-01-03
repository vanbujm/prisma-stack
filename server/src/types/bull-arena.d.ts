declare module 'bull-arena' {
  import { RedisOptions } from './index';

  function Arena(options: Arena.ArenaOptions, webOptions: Arena.ArenaWebOptions): Express.RequestHandler;

  namespace Arena {
    interface QueueOptions {
      name: string;
      hostId: string;
      redis: RedisOptions;
    }

    export interface ArenaOptions {
      queues?: QueueOptions[];
    }

    export interface ArenaWebOptions {
      basePath?: string;
      disableListen?: boolean;
    }
  }

  export = Arena;
}
