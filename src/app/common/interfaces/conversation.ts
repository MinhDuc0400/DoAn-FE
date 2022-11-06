export interface Participant {
  isRead: boolean;
  userId: string;
}

export interface Conversation {
  _id: string;
  title: string;
  description: string;
  postId: string;
  participants: Participant[];
}
