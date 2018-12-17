import jwt from 'jsonwebtoken';

export const getUserId = context => {
  const Authorization = context.req.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export default {
  getUserId,
  AuthError
};
