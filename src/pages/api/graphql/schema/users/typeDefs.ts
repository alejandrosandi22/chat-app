import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type LastMessage {
    id: ID
    content: String!
    type: String!
    createda_at: String
  }

  type Value {
    value: String!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    username: String!
    password: String
    avatar: String
    cover_photo: String
    website: String
    description: String
    provider: String!
    show_profile_photo: String
    contacts_request: String
    lastMessage: LastMessage
    contacts: [Int]!
    created_at: String
    updated_at: String
  }
  type Query {
    getUser(username: String!): User
    getCurrentUser: User
    getContacts: [User]
    getUsers(show_profile_photo: String, contacts_request: String): [User]
  }

  type Mutation {
    signIn(email: String!, password: String!): Value
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      avatar: String!
      cover_photo: String!
      description: String
      website: String
      provider: String!
    ): User
    updateUser(
      id: ID!
      name: String!
      username: String!
      avatar: String!
      cover_photo: String!
      website: String
      description: String
      show_profile_photo: String!
      contacts_request: String!
      contacts: [Int]!
    ): User
    changePassword(password: String!, id: ID!): User
    deleteUser(email: String!): User
  }
`;
