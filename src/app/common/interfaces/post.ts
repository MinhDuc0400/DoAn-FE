import { FileTypeEnum } from '../enum/fileType.enum';
import { UserTypeEnum } from '../enum/userType.enum';
import { PostStatusTypeEnum } from '../enum/postStatusType.enum';

export interface Post {
  _id: string;
  title: string;
  description: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  address: string;
  price: string;
  userId: string;
  user: User;
  status: PostStatusTypeEnum;
  votedUsers: string[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserTypeEnum;
}

export interface Image {
  name: string;
  type: FileTypeEnum;
  url: string;
}

export interface ChangePostStatusRequest {
  postId: string;
  status: PostStatusTypeEnum;
}

export interface CreatePostRequest {
  title: string;
  description: string;
  images: Image[];
  address: string;
  price: number;
}

export interface CreatePostResponse {
  title: string;
  description: string;
  userId: string;
  images: Image[];
  address: string;
  status: PostStatusTypeEnum;
}
