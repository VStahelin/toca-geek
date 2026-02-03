/**
 * Helpers para URLs da listagem de produtos com filtros em query string.
 * Usado em breadcrumbs, tags e links de filtro.
 */

export type SortOption = "featured" | "price_asc" | "price_desc" | "name";

export interface ProdutosQuery {
  category?: string;
  tag?: string;
  sort?: SortOption;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
}

/** Monta path + search para /produtos com query params (para HashRouter: #/produtos?...) */
export function buildProdutosSearch(params: ProdutosQuery): string {
  const sp = new URLSearchParams();
  if (params.category) sp.set("category", params.category);
  if (params.tag) sp.set("tag", params.tag);
  if (params.sort && params.sort !== "featured") sp.set("sort", params.sort);
  if (params.minPrice != null && params.minPrice > 0) sp.set("minPrice", String(params.minPrice));
  if (params.maxPrice != null && params.maxPrice > 0) sp.set("maxPrice", String(params.maxPrice));
  if (params.material) sp.set("material", params.material);
  const search = sp.toString();
  return search ? `?${search}` : "";
}

/** Link href para a listagem com filtros (usar com <Link to={...}> ou navigate) */
export function buildProdutosUrl(params: ProdutosQuery): string {
  const search = buildProdutosSearch(params);
  return `/produtos${search}`;
}

/** Lê query atual (SearchParams) e retorna objeto ProdutosQuery */
export function parseProdutosSearch(searchParams: URLSearchParams): ProdutosQuery {
  const category = searchParams.get("category") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const sort = searchParams.get("sort") as SortOption | null;
  const validSort: SortOption[] = ["featured", "price_asc", "price_desc", "name"];
  const minPriceRaw = searchParams.get("minPrice");
  const maxPriceRaw = searchParams.get("maxPrice");
  const minPrice = minPriceRaw != null ? parseInt(minPriceRaw, 10) : undefined;
  const maxPrice = maxPriceRaw != null ? parseInt(maxPriceRaw, 10) : undefined;
  const material = searchParams.get("material") ?? undefined;
  return {
    category: category || undefined,
    tag: tag || undefined,
    sort: sort && validSort.includes(sort) ? sort : "featured",
    minPrice: minPrice != null && !Number.isNaN(minPrice) ? minPrice : undefined,
    maxPrice: maxPrice != null && !Number.isNaN(maxPrice) ? maxPrice : undefined,
    material: material || undefined,
  };
}
