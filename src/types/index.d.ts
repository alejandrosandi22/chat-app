type MessageType = {
  date?: string;
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
  coverPhoto: string;
  description?: string;
  website: string;
  contacts: number[];
  showProfile?: string;
  contactsRequests?: string;
  lastMessage?: MessageType;
  contacts: number[];
  createdAt?: string;
  updatedAt?: string;
};

type EmojiType = {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
};

export type { UserType, MessageType, EmojiType };
