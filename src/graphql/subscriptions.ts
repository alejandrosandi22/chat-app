import { gql } from '@apollo/client';

export const MESSAGE_SENDED = gql`
  subscription MessegeSended {
    messegeSended {
      id
      content
      filename
      receiver
      sender
      type
      created_at
    }
  }
`;
