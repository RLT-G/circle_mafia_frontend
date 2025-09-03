import api from './api';

export default class AdminService {
  static async getRealActivePlayers(): Promise<unknown> {
    const res = await api.get<unknown>('/admin/active-players/real');
    return res.data;
  }
}
