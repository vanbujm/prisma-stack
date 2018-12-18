export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export const getUserId = ({ user }) => {
  if (user) return user.userId;
  throw new AuthError();
};

export default {
  getUserId
};
