export const getUserId = ({ user }) => {
  if (user) return user.userId;
  else throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export default {
  getUserId
};
