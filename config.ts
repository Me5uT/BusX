export const config = {
  // Cast import.meta to any to prevent TS error about missing 'env' property
  apiBaseUrl: (import.meta as any).env?.VITE_API_BASE_URL || '/api',
  isDev: (import.meta as any).env?.DEV || false,
  enableMock: true,
};