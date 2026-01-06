/**
 * Cliente HTTP centralizado usando Axios
 * Configuração única para todas as requisições da aplicação
 */

import axios, { AxiosInstance, AxiosError } from "axios";
import { API_CONFIG } from "./config";

// Cria instância do axios com configurações padrão
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Log de erro para debug (em produção, enviar para serviço de monitoramento)
    console.error("API Error:", {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
    });

    // Retorna erro formatado
    return Promise.reject(error);
  }
);

export default apiClient;
