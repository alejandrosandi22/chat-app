import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: ID
    name: String!
    email: String!
    username: String!
    password: String
    avatar: String
    coverPhoto: String
    website: String
    description: String
    provider: String!
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
      username: String!
      password: String!
      avatar: String!
      coverPhoto: String!
      description: String!
      website: String!
      provider: String!
    ): User
    updateUser(
      id: ID!
      name: String!
      username: String!
      avatar: String!
      coverPhoto: String!
      website: String!
      description: String!
      showProfile: String!
      contactRequests: String!
      contacts: [Int]!
    ): User
    changePassword(password: String!, id: ID!): User
    deleteUser(email: String!): User
  }
`;
