/**
 * Serviço de Produtos
 * Busca produtos à venda (links Shoppe e Mercado Livre)
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "./config";
import type { ProdutosResponse } from "./types";

/**
 * Busca todos os produtos
 */
export const getProdutos = async (): Promise<ProdutosResponse> => {
  const response = await apiClient.get<ProdutosResponse>(API_ENDPOINTS.PRODUTOS);
  return response.data;
};
