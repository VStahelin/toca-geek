/**
 * Hook customizado para buscar dados do footer
 * Usa React Query para cache e gerenciamento de estado
 */

import { useQuery } from "@tanstack/react-query";
import { getFooter } from "@/lib/api/footer.service";
import type { FooterData } from "@/lib/api/types";

/**
 * Hook para buscar dados do footer
 */
export const useFooter = () => {
  return useQuery<FooterData>({
    queryKey: ["footer"],
    queryFn: getFooter,
    staleTime: 10 * 60 * 1000, // 10 minutos - dados estáticos não mudam frequentemente
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

