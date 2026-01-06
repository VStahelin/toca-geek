/**
 * Hook customizado para buscar dados da galeria
 * Usa React Query para cache e gerenciamento de estado
 */

import { useQuery } from "@tanstack/react-query";
import {
  getGaleria,
  getProjetosDestaque,
  getProjetosPorCategoria,
} from "@/lib/api/galeria.service";
import type { GaleriaResponse } from "@/lib/api/types";

/**
 * Hook para buscar todos os projetos da galeria
 */
export const useGaleria = () => {
  return useQuery<GaleriaResponse>({
    queryKey: ["galeria"],
    queryFn: getGaleria,
    staleTime: 5 * 60 * 1000, // 5 minutos - dados estáticos não mudam frequentemente
    gcTime: 10 * 60 * 1000, // 10 minutos (antigo cacheTime)
  });
};

/**
 * Hook para buscar apenas projetos destacados
 */
export const useProjetosDestaque = () => {
  return useQuery<GaleriaResponse>({
    queryKey: ["galeria", "destaque"],
    queryFn: getProjetosDestaque,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Hook para buscar projetos por categoria
 */
export const useProjetosPorCategoria = (category: string) => {
  return useQuery<GaleriaResponse>({
    queryKey: ["galeria", "categoria", category],
    queryFn: () => getProjetosPorCategoria(category),
    enabled: !!category, // Só executa se category for válido
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
