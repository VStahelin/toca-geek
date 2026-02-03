/**
 * Hook para buscar dados dos produtos (Shoppe / Mercado Livre)
 */

import { useQuery } from "@tanstack/react-query";
import { getProdutos } from "@/lib/api/produtos.service";
import type { ProdutosResponse } from "@/lib/api/types";

export const useProdutos = () => {
  return useQuery<ProdutosResponse>({
    queryKey: ["produtos"],
    queryFn: getProdutos,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
