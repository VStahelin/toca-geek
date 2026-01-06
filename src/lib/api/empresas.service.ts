/**
 * Serviço de Empresas
 * Centraliza todas as chamadas relacionadas aos dados das empresas/clientes
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "./config";
import type { EmpresasResponse } from "./types";

/**
 * Busca todas as empresas, ordenadas por order
 * @returns Lista de empresas ordenadas
 */
export const getEmpresas = async (): Promise<EmpresasResponse> => {
  const response = await apiClient.get<EmpresasResponse>(
    API_ENDPOINTS.EMPRESAS
  );
  // Ordena por order antes de retornar
  return response.data.sort((a, b) => a.order - b.order);
};
