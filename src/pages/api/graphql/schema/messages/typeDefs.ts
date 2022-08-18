import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar Date

  type Message {
    id: ID
    content: String!
    filename: String
    sender: String!
    receiver: String!
    type: String!
    created_at: Date
  }
  type Query {
    getMessage: Message
    getLastMessage(contactId: String!, userId: String!): Message
    getConversationMesages(sender: String!, receiver: String!): [Message]
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
