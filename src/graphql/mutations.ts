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

export const REMOVE_CONTACT = gql`
  mutation RemoveContact($removeContactId: Int!) {
    removeContact(id: $removeContactId) {
      id
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
