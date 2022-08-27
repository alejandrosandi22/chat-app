import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query getContacts($userId: Int) {
    getContacts(userId: $userId) {
      id
      name
      email
      username
      contacts
      lastMessage {
        id
        content
        type
        created_at
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

export const SEARCH_USERS = gql`
  query searchUsers($search: String!) {
    searchUsers(search: $search) {
      id
      name
      email
      username
      avatar
      cover_photo
      website
      description
      show_profile_photo
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($contactId: Int!, $offset: Int!, $limit: Int!) {
    getMessages(contactId: $contactId, offset: $offset, limit: $limit) {
      id
      date
      content
      receiver
      sender
      type
      filename
      created_at
    }
  }
`;
