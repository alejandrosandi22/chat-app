type MessageType = {
  date?: string;
  id: number;
  content: string;
  fileName?: string;
  sender: number;
  receiver: number;
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
  cover_photo: string;
  description?: string;
  website: string;
  show_profile_photo?: string;
  contacts_request?: string;
  lastMessage?: MessageType;
  contacts: number[];
  created_at?: string;
  updated_at?: string;
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
