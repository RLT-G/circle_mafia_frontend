import { apiURL } from "../constans";

export default class Scripts {
  static isMobile() {
    if (typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  /**
   * Сокращает Tron-адрес до вида 0x1234567..89
   */
  static shortTron(address: string): string {
    if (!address || !address.startsWith("T")) return address;

    const start = address.slice(0, 6);  // первые 6 символов
    const end = address.slice(-4);      // последние 4 символа
    return `${start}..${end}`;
  }

  /**
   * Проверка "пинга" до бекенда через HTTP HEAD-запрос
   */
  static async pingServer(): Promise<number | null> {
    const start = performance.now();
    try {
      await fetch(`${apiURL}/health`, { method: "GET", cache: "no-store" });
      const end = performance.now();
      const latency = end - start;
      return parseFloat(latency.toFixed(2));
    } catch (err) {
      return null; // сервер сдох/недоступен
    }
  }
}

