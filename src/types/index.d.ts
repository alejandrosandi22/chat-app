type MessageType = {
  id: string;
  content: string;
  fileName?: string;
  sender: string;
  receiver: string;
  type: string;
  created_at: string;
};

type UserType = {
  id: number;
  name: string;
  email: string;
  username: string;
  password?: string;
  avatar: string;
  description?: string;
  showProfile?: string;
  contactsRequests?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type { UserType, MessageType };
