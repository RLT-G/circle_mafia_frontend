import api from './api';

interface INonce {
  nonce: string;
}

export interface ILogin {
  access_token: string;
  user_id: number;
  wallet_address: string;
  username: string;
}

export interface IUserProfile {
  user_id: string;
  username: string;
  wallet_address: string;
}

export interface IAvatarInfo {
  avatar_url: string;
  avatar_size: number;
  supported_formats: string[];
  max_file_size: number;
}

export interface IPlayersCount {
  active_players: number;
  timestamp: string;
}

export default class UserService {
  static async getNonce(address: string): Promise<string> {
    const response = await api.post<INonce>("/api/users/nonce", {
      address,
    })
    const nonce = response.data.nonce
    return nonce
  }

  static async login(address: string, signature: string, nonce: string): Promise<ILogin> {
    const response = await api.post<ILogin>("/api/users/login", {
      address,
      signature,
      nonce
    })
    return response.data
  }

  static async getMe(): Promise<IUserProfile> {
    const response = await api.get<IUserProfile>("/api/users/me")
    return response.data
  }

  static async getAvatarInfo(): Promise<IAvatarInfo> {
    const response = await api.get<IAvatarInfo>("/api/users/avatar/info")
    return response.data
  }

  static async uploadAvatar(formData: FormData): Promise<any> {
    const response = await api.post("/api/users/avatar/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
  }

  static async getPlayersCount(): Promise<number> {
    const response = await api.get<IPlayersCount>("/active-players")
    const { active_players } = response.data
    return active_players
  }
}
