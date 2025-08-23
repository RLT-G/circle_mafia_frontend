/// <reference types="vite/client" />

interface TronWebLike {
  defaultAddress?: {
    base58?: string;
    hex?: string;
  };
}

interface TronLinkProviderLike {
  request?: (args: { method: string }) => Promise<unknown>;
  tronWeb?: TronWebLike;
}

declare global {
  interface Window {
    tronLink?: TronLinkProviderLike;
    tronWeb?: TronWebLike;
  }
}

export {};
