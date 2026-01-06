/**
 * Serviço de Footer
 * Centraliza todas as chamadas relacionadas aos dados do footer
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "./config";
import type { FooterData } from "./types";

/**
 * Busca os dados do footer
 * @returns Dados completos do footer
 */
export const getFooter = async (): Promise<FooterData> => {
  const response = await apiClient.get<FooterData>(API_ENDPOINTS.FOOTER);
  return response.data;
};
