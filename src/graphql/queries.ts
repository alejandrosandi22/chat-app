import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query getContacts {
    getContacts {
      name
      email
      username
      contacts
      lastMessage {
        id
        content
        type
        createda_at
      }
      cover_photo
      avatar
      website
      description
      provider
      show_profile_photo
      contacts_request
      created_at
      updated_at
    }
  }
`;

export const GET_LAST_MESSAGE = gql`
  query getLastMessage($userId: Int!, $contactId: Int!) {
    lastMessage(userId: $userId, contactId: $contactId) {
      id
      text
      created_at
      senderId
      receiverId
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      name
      email
      username
      avatar
      cover_photo
      website
      description
      provider
      show_profile_photo
      contacts_request
      contacts
      created_at
      updated_at
    }
  }
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      name
      email
      username
      avatar
      cover_photo
      website
      description
      provider
      show_profile_photo
      contacts_request
      contacts
      created_at
      updated_at
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
