import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: ID
    name: String!
    email: String!
    username: String!
    password: String
    avatar: String
    description: String
    showProfile: String
    contactRequests: String
    createdAt: String
    updatedAt: String
  }
  type Query {
    getUser: User
    getCurrentUser: User
    getUsers(showProfile: String, contactRequests: String): [User]
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      avatar: String!
      description: String!
      showProfile: String!
      contactRequests: String!
    ): User
  }
`;
