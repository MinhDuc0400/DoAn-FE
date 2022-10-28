import { UserTypeEnum } from '../enum/userType.enum';

export interface RegisterResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  userType: UserTypeEnum;
}

export interface LoginResponse {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}
