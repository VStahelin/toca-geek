import apiClient from "./client";
import { API_ENDPOINTS } from "./config";
import type { FAQResponse } from "./types";

/**
 * Serviço para buscar dados do FAQ
 */
export const faqService = {
  /**
   * Busca todas as perguntas frequentes
   */
  getFAQ: async (): Promise<FAQResponse> => {
    const response = await apiClient.get<FAQResponse>(API_ENDPOINTS.FAQ);
    return response.data;
  },
};

