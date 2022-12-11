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
  location: Location;
  price: string;
  userId: string;
  user: User;
  status: PostStatusTypeEnum;

  vote: number;
  votedUsers: string[];
}

interface Location {
  districtId: string;
  provinceId: string;
  districtName: string;
  provinceName: string;
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
  districtId: string;
  provinceId: string;
  districtName: string;
  provinceName: string;
  price: number;
}

export interface CreatePostResponse {
  title: string;
  description: string;
  userId: string;
  images: Image[];
  address: string;
  status: PostStatusTypeEnum;
  districtId: string;
  provinceId: string;
}

export interface PostVoteChartItem {
  day: string;
  votes: number;
}
