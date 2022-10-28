import { FileTypeEnum } from '../enum/fileType.enum';

export interface Post {
  title: string;
  description: string;
  images: Image[];
  address: string;
  userId: string;
  status: string;
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
