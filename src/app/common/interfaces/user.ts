export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  _id?: string;
}

export interface CurrentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}
