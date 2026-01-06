import { useQuery } from "@tanstack/react-query";
import { faqService } from "@/lib/api/faq.service";

/**
 * Hook para buscar dados do FAQ
 */
export const useFAQ = () => {
  return useQuery({
    queryKey: ["faq"],
    queryFn: () => faqService.getFAQ(),
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};
