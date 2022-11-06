import { User } from './post';

export interface Message {
  conversationId: string;
  userId: string;
  message: string;
  file?: any;
  reply?: boolean;
  user: User;
  type?: string;
}

export interface MessageEmit {
  message: string;
  files: any[];
}
