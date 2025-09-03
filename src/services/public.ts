import api from './api';

export default class PublicService {
  static async getHealth(): Promise<unknown> {
    const res = await api.get<unknown>('/health');
    return res.data;
  }

  static async getActivePlayers(): Promise<unknown> {
    const res = await api.get<unknown>('/active-players');
    return res.data;
  }
}
