import api from './api';

export default class SkillsService {
  static async getInfo(): Promise<unknown> {
    const res = await api.get<unknown>('/api/skills/info');
    return res.data;
  }

  static async getCost(skillType: string): Promise<unknown> {
    const res = await api.get<unknown>(`/api/skills/cost/${encodeURIComponent(skillType)}`);
    return res.data;
  }
}
