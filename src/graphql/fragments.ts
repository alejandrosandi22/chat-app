import { gql } from '@apollo/client';

export const USER_DETAILS = gql`
  fragment UserDetails on User {
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
`;

export const CONTACT_DETAILS = gql`
  fragment ContactDetails on User {
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
`;

export const REQUEST_DETAILS = gql`
  fragment RequestDetails on Request {
    id
    content
    receiver
    sender
    state
    response
    created_at
  }
`;
