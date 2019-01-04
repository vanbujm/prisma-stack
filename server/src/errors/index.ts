export class AppSecretRequiredError extends Error {
  constructor() {
    super('APP_SECRET required');
    Error.captureStackTrace(this, AppSecretRequiredError);
  }
}

export class RedisConfigRequiredError extends Error {
  constructor() {
    super('REDIS_PORT and REDIS_HOST env variables are required');
    Error.captureStackTrace(this, RedisConfigRequiredError);
  }
}

export class AuthError extends Error {
  constructor(msg: string | undefined) {
    super(msg || 'Not authorized');
    Error.captureStackTrace(this, AuthError);
  }
}

export class NoUserFoundError extends Error {
  constructor(msg: string | undefined) {
    super(msg || 'User not found');
    Error.captureStackTrace(this, NoUserFoundError);
  }
}

export class InvalidTransitionError extends Error {
  constructor(msg?: string) {
    super(msg || 'Invalid transition');
    Error.captureStackTrace(this, InvalidTransitionError);
  }
}

export class NaNError extends Error {
  constructor(msg: unknown) {
    super(`${msg} must be a number`);
    Error.captureStackTrace(this, NaNError);
  }
}
