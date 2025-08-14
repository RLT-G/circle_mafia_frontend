import type { IUserData } from '../context';
import api from './api';

export interface ISimpleUser {
  user_id: string;
  username: string;
  email: string;
  balance: number;
  password: string;
}

export interface IUserProfile {
  wallets: any[];
  username: string;
  balance: number;
  total_winnings: number;
  is_admin: boolean;
  hashed_password: string;
  email: string;
  user_id: string;
  primary_wallet_id: string | null;
  games_played: number;
  leaderboard_rank: number;
}

export const createSimpleUser = async (): Promise<ISimpleUser> => {
  const response = await api.post<ISimpleUser>("/api/users/create_simple")
  return response.data
}

export interface ILogin {
  access_token: string;
}

export const login = async (userData: IUserData): Promise<ILogin> => {
  const response = await api.post<ILogin>("/api/users/login", userData)
  return response.data
}

export const getMe = async (accessToken: string): Promise<IUserProfile> => {
  const response = await api.get<IUserProfile>("/api/users/me", {
    headers: {
      Cookie: `refer_access_token=${accessToken}`
    }
  })
  console.log("status", response.status)
  return response.data
}
