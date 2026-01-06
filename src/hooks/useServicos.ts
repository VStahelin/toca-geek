/**
 * Hook customizado para buscar dados dos serviços
 * Usa React Query para cache e gerenciamento de estado
 */

import { useQuery } from "@tanstack/react-query";
import { getServicos } from "@/lib/api/servicos.service";
import type { Servico } from "@/lib/api/types";

/**
 * Hook para buscar todos os serviços
 */
export const useServicos = () => {
  return useQuery<Servico[]>({
    queryKey: ["servicos"],
    queryFn: getServicos,
    staleTime: 10 * 60 * 1000, // 10 minutos - dados estáticos não mudam frequentemente
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};
