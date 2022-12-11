import { User } from './post';

export interface Participant {
  isRead: boolean;
  userId: string;
}

export interface Conversation {
  _id: string;
  title: string;
  description: string;
  postId: string;
  users: User[];
  updatedAt: string;
}
