/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolvers as UserResolvers } from './users/resolvers';
import { typeDefs as userTypeDefs } from './users/typeDefs';

import { resolvers as MessageResolvers } from './messages/resolvers';
import { typeDefs as messageTypeDefs } from './messages/typeDefs';

export function getResolvers(allResolvers: any) {
  let Query = {};
  let Mutation = {};

  const res = allResolvers
    .map((resolver: any) => {
      Query = { ...Query, ...resolver.Query };
      Mutation = { ...Mutation, ...resolver.Mutation };
      return {
        Query,
        Mutation,
      };
    })
    .reduce((_: any, b: any) => b, {});

  return res;
}

const typeDefs = [userTypeDefs, messageTypeDefs];
const resolvers = getResolvers([UserResolvers, MessageResolvers]);

export { resolvers, typeDefs };
