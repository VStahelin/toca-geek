/**
 * Serviço de Serviços
 * Centraliza todas as chamadas relacionadas aos dados dos serviços
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "./config";
import type { ServicosResponse } from "./types";

/**
 * Busca todos os serviços, ordenados por order
 * @returns Lista de serviços ordenados
 */
export const getServicos = async (): Promise<ServicosResponse> => {
  const response = await apiClient.get<ServicosResponse>(
    API_ENDPOINTS.SERVICOS
  );
  // Ordena por order antes de retornar
  return response.data.sort((a, b) => a.order - b.order);
};
