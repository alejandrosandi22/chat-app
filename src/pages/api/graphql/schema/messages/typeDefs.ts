import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Message {
    id: ID
    content: String!
    filename: String
    sender: String!
    receiver: String!
    type: String!
    created_at: String
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
