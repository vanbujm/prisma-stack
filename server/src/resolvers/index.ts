import mutations from './mutations';
import queries from './queries';
import types from './types';

const resolvers = {
  ...types,
  Query: queries,
  Mutation: mutations
};

export default resolvers;
