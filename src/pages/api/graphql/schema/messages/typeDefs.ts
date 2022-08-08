import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Message {
    id: ID
    content: String!
    filename: String
    sender: String!
    receiver: String!
    type: String!
    createdAt: String
  }
  type Query {
    getMessage: Message
    getLastMessage: Message
    getConversationMesages(sender: String!, receiver: String!): [Message]
  }

  type Mutation {
    createMessage(
      content: String!
      filename: String
      sender: String!
      receiver: String!
      type: String!
    ): Message
  }
`;
