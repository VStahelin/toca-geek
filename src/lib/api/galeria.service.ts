/**
 * Serviço de Galeria
 * Centraliza todas as chamadas relacionadas à galeria de projetos
 */

import apiClient from "./client";
import { API_ENDPOINTS } from "./config";
import type { GaleriaResponse, SiteMap } from "./types";

/**
 * Busca todos os projetos da galeria
 * @returns Array de projetos da galeria
 */
export const getGaleria = async (): Promise<GaleriaResponse> => {
  const response = await apiClient.get<GaleriaResponse>(API_ENDPOINTS.GALERIA);
  return response.data;
};

/**
 * Busca o site map (mapa de arquivos)
 * @returns Site map com todas as URLs dos recursos
 */
export const getSiteMap = async (): Promise<SiteMap> => {
  const response = await apiClient.get<SiteMap>(API_ENDPOINTS.SITE_MAP);
  return response.data;
};

/**
 * Busca apenas projetos destacados
 * @returns Array de projetos destacados
 */
export const getProjetosDestaque = async (): Promise<GaleriaResponse> => {
  const galeria = await getGaleria();
  return galeria.filter((projeto) => projeto.is_highlighted);
};

/**
 * Busca projetos por categoria
 * @param category - Categoria para filtrar
 * @returns Array de projetos da categoria
 */
export const getProjetosPorCategoria = async (
  category: string
): Promise<GaleriaResponse> => {
  const galeria = await getGaleria();
  return galeria.filter((projeto) => projeto.category === category);
};
