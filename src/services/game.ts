import api from './api';

export default class GameService {
  static async getBonusZonesInfo(): Promise<unknown> {
    const res = await api.get<unknown>('/api/game/bonus-zones-info');
    return res.data;
  }

  static async getLeaderboard(): Promise<unknown> {
    const res = await api.get<unknown>('/api/game/leaderboard');
    return res.data;
  }

  static async getGamePhase(): Promise<unknown> {
    const res = await api.get<unknown>('/api/game/game-phase');
    return res.data;
  }

  static async exitGame(gameId: string): Promise<unknown> {
    const res = await api.post<unknown>(`/api/game/${encodeURIComponent(gameId)}/exit`);
    return res.data;
  }
}
