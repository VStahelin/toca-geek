/**
 * Hook customizado para buscar dados das empresas
 * Usa React Query para cache e gerenciamento de estado
 */

import { useQuery } from "@tanstack/react-query";
import { getEmpresas } from "@/lib/api/empresas.service";
import type { Empresa } from "@/lib/api/types";

/**
 * Hook para buscar todas as empresas
 */
export const useEmpresas = () => {
  return useQuery<Empresa[]>({
    queryKey: ["empresas"],
    queryFn: getEmpresas,
    staleTime: 10 * 60 * 1000, // 10 minutos - dados estáticos não mudam frequentemente
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};
