export enum UserRole {
  Regular = 'Regular',
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
}

export interface AuthUser {
  _id?: string;
  id: string;
  role: UserRole;
  fullName?: string;
  email?: string;
  createAt: Date;
  city?: string;
  state?: string;
  country?: string;
  gamertag?: string;
  facebookId?: string;
  googleId?: string;
}

export interface AuthSocialPayload {
  auth: 'social',
  responseType: 'success' | 'error',
  provider: 'Facebook' | 'Google',
  token: string,
}
