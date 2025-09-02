export default class TronLinkService {
  /**
   * Редирект в мобильное приложение TronLink
   */
  static redirectToMobileApp() {
    const json = {
      url: window.location.origin,
      action: "open",
      protocol: "tronlink",
      version: "1.0"
    };
    const encodedParam = encodeURIComponent(JSON.stringify(json));
    const deeplink = `tronlinkoutside://pull.activity?param=${encodedParam}`;
    window.location.href = deeplink;
  }

  /**
   * Проверка установлен ли TronLink (desktop)
   */
  static isInstalled(): boolean {
    return typeof window !== "undefined" && !!window.tronLink;
  }

  /**
   * Запрос доступа к аккаунтам TronLink (desktop)
   */
  static async requestAccounts(): Promise<void> {
    if (window.tronLink?.request) {
      await window.tronLink.request({ method: "tron_requestAccounts" });
    }
  }

  /**
   * Получение активного адреса кошелька (desktop)
   */
  static getWalletAddress(): string | undefined {
    const tronWeb = window.tronWeb || window.tronLink?.tronWeb;
    return tronWeb?.defaultAddress?.base58;
  }

  /**
   * Подписать произвольное сообщение (например nonce)
   */
  static async signMessage(address: string, message: string): Promise<string> {
    const tronWeb = window.tronWeb || window.tronLink?.tronWeb;

    try {
      // signMessageV2 подписывает plain text и возвращает подпись
      const signed = await tronWeb.trx.signMessageV2(message);
      return signed;
    } catch (err) {
      throw err;
    }
  }
}
