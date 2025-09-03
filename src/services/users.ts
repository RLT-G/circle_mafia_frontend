import api from './api';

interface INonce {
  nonce: string;
}

export interface ILogin {
  access_token?: string;
  user_id?: number | string;
  wallet_address?: string;
  username?: string;
}

export interface IUserProfile {
  user_id: string;
  username: string;
  wallet_address?: string;
  balance?: number;
}

export interface IAvatarInfo {
  avatar_url: string;
  avatar_size: number;
  supported_formats: string[];
  max_file_size: number;
}

export interface IPlayersCount {
  active_players: number;
  timestamp?: string;
}

export default class UserService {
  static async getNonce(address: string): Promise<string> {
    const response = await api.post<INonce>('/api/users/nonce', { address });
    return response.data.nonce;
  }

  static async login(address: string, signature: string, nonce: string): Promise<ILogin> {
    const response = await api.post<ILogin>('/api/users/login', { address, signature, nonce });
    return response.data;
  }

  static async logout(): Promise<{ success: boolean }> {
    const response = await api.post<{ success: boolean }>('/api/users/logout');
    return response.data;
  }

  static async getMe(): Promise<IUserProfile> {
    const response = await api.get<IUserProfile>('/api/users/me');
    return response.data;
  }

  static async getStatistic(userId?: string): Promise<unknown> {
    const res = await api.get<unknown>('/api/users/statistic', { params: userId ? { user_id: userId } : {} });
    return res.data;
  }

  static async getLeaderboard(): Promise<unknown> {
    const res = await api.get<unknown>('/api/users/leaderboard');
    return res.data;
  }

  static async getAvatarInfo(): Promise<IAvatarInfo> {
    const response = await api.get<IAvatarInfo>('/api/users/avatar/info');
    return response.data;
  }

  static async uploadAvatar(formData: FormData): Promise<unknown> {
    const response = await api.post<unknown>('/api/users/avatar/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  static async deleteAvatar(): Promise<unknown> {
    const response = await api.delete<unknown>('/api/users/avatar');
    return response.data;
  }

  // convenience: active players via public endpoint
  static async getPlayersCount(): Promise<number> {
    const response = await api.get<IPlayersCount>('/active-players');
    return response.data.active_players;
  }
}
