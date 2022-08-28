import { gql } from '@apollo/client';
import { CONTACT_DETAILS, USER_DETAILS } from './fragments';

export const GET_CONTACTS = gql`
  ${CONTACT_DETAILS}
  query getContacts($userId: Int) {
    getContacts(userId: $userId) {
      ...ContactDetails
    }
  }
`;

export const GET_CURRENT_USER = gql`
  ${USER_DETAILS}
  query getCurrentUser {
    getCurrentUser {
      ...UserDetails
    }
  }
`;

export const GET_USER = gql`
  ${USER_DETAILS}
  query getUser($username: String, $id: Int) {
    getUser(username: $username, id: $id) {
      ...UserDetails
    }
  }
`;

export const SEARCH_USERS = gql`
  ${USER_DETAILS}
  query searchUsers($search: String!) {
    searchUsers(search: $search) {
      ...UserDetails
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

export const RECEIVE_REQUESTS = gql`
  query ReceiveRequest {
    receiveRequest {
      id
      content
      receiver
      sender
      state
      response
      created_at
    }
  }
`;
