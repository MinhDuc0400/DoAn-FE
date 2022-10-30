import { FileTypeEnum } from '../enum/fileType.enum';
import { UserTypeEnum } from '../enum/userType.enum';

export interface Post {
  _id: string;
  title: string;
  description: string;
  images: Image[];
  address: string;
  userId: string;
  user: User;
  status: string;
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

export interface CreatePostRequest {
  title: string;
  description: string;
  images: Image[];
  address: string;
}

export interface CreatePostResponse {
  title: string;
  description: string;
  userId: string;
  images: Image[];
  address: string;
  status: string;
}
