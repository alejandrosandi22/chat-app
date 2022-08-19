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

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      value
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    signUp(
      name: $name
      email: $email
      username: $username
      password: $password
    ) {
      value
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $name: String
    $username: String
    $avatar: String
    $coverPhoto: String
    $website: String
    $description: String
    $showProfilePhoto: String
    $contactsRequest: String
    $contacts: [Int]
  ) {
    updateUser(
      name: $name
      username: $username
      avatar: $avatar
      cover_photo: $coverPhoto
      website: $website
      description: $description
      show_profile_photo: $showProfilePhoto
      contacts_request: $contactsRequest
      contacts: $contacts
    ) {
      name
    }
  }
`;

export const REMOVE_CONTACT = gql`
  mutation RemoveContact($removeContactId: Int!) {
    removeContact(id: $removeContactId) {
      id
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
