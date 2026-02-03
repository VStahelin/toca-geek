import type { Produto } from "@/lib/api/types";

/**
 * Jaccard similarity entre dois conjuntos de tags (normalizadas em minúsculo).
 * J(A, B) = |A ∩ B| / |A ∪ B| — valor entre 0 (nenhuma sobreposição) e 1 (idênticos).
 * Usado em recomendações content-based quando não há histórico de compras.
 */
function jaccardSimilarity(tagsA: string[], tagsB: string[]): number {
  if (tagsA.length === 0 && tagsB.length === 0) return 1;
  const setA = new Set(tagsA.map((t) => t.toLowerCase().trim()));
  const setB = new Set(tagsB.map((t) => t.toLowerCase().trim()));
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

/**
 * Gera produtos relacionados por similaridade content-based:
 * - Mesma categoria (peso forte)
 * - Sobreposição de tags (Jaccard)
 * Ordena por score e retorna até `limit` itens, excluindo o próprio produto.
 */
export function getRelatedProducts(
  currentProduct: Produto,
  allProducts: Produto[],
  limit: number = 4
): Produto[] {
  const currentId = currentProduct.id;
  const currentTags = currentProduct.tags ?? [];
  const currentCategory = currentProduct.category;

  const scored = allProducts
    .filter((p) => p.id !== currentId)
    .map((product) => {
      const sameCategory = product.category === currentCategory ? 2 : 0;
      const tagSimilarity = jaccardSimilarity(
        currentTags,
        product.tags ?? []
      );
      const score = sameCategory + tagSimilarity;
      return { product, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product }) => product);

  return scored;
}
