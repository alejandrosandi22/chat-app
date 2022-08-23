import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar Date

  type Message {
    id: ID
    date: Date
    content: String!
    filename: String
    sender: Int!
    receiver: Int!
    type: String!
    created_at: Date
  }
  type Query {
    getMessages(contactId: Int!): [Message]
    getLastMessage(contactId: String!, userId: String!): Message
  }

  type Mutation {
    createMessage(
      content: String!
      filename: String
      sender: Int!
      receiver: Int!
      type: String!
    ): Message
  }
`;
