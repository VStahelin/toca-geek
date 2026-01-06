/**
 * Configuração da API
 * Centraliza a URL base e configurações do cliente HTTP
 */

// URL base dos estáticos - sempre usa o GitHub Pages original
// Os estáticos continuam em: https://vstahelin.github.io/toca-geek-statics
// Pode ser sobrescrito via variável de ambiente para desenvolvimento
const STATICS_BASE_URL =
  import.meta.env.VITE_STATICS_BASE_URL ||
  "https://vstahelin.github.io/toca-geek-statics";

export const API_CONFIG = {
  // URL base do repositório de estáticos
  BASE_URL: STATICS_BASE_URL,
  // Timeout padrão para requisições (em ms)
  TIMEOUT: 10000,
} as const;

/**
 * Endpoints da API
 */
export const API_ENDPOINTS = {
  GALERIA: "/data/galeria.json",
  SITE_MAP: "/data/site_map.json",
  FOOTER: "/data/footer.json",
} as const;
