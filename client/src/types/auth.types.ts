import { User } from './index';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

export interface RegisterResponse extends LoginResponse {}
