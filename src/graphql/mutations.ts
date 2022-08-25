import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $content: String!
    $receiver: Int!
    $type: String!
    $filename: String
  ) {
    sendMessage(
      content: $content
      receiver: $receiver
      type: $type
      filename: $filename
    ) {
      id
      filename
      content
      sender
      receiver
      created_at
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      value
    }
  }
`;
