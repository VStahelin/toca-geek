import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProdutos } from "@/hooks/useProdutos";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  buildProdutosUrl,
  parseProdutosSearch,
  type SortOption,
} from "@/lib/productListUrl";
import type { Produto } from "@/lib/api/types";

function parsePrice(priceStr: string | undefined): number {
  if (!priceStr) return 0;
  const match = priceStr.replace(/\s/g, "").match(/[\d,.]+/);
  if (!match) return 0;
  const num = match[0].replace(".", "").replace(",", ".");
  return parseFloat(num) || 0;
}

const Produtos = () => {
  const { data: produtos, isLoading, error } = useProdutos();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(
    () => parseProdutosSearch(searchParams),
    [searchParams]
  );
  const {
    category: selectedCategory,
    tag: selectedTag,
    sort: sortBy,
    minPrice: selectedMinPrice,
    maxPrice: selectedMaxPrice,
    material: selectedMaterial,
  } = query;

  const categoriesWithCount = useMemo(() => {
    if (!produtos) return [];
    const map = new Map<string, number>();
    produtos.forEach((p) => {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [produtos]);

  /** Materiais extraídos de variations onde type === "Material" */
  const materialsWithCount = useMemo(() => {
    if (!produtos) return [];
    const map = new Map<string, number>();
    produtos.forEach((p) => {
      const materialVar = (p.variations ?? []).find(
        (v) => v.type.toLowerCase() === "material"
      );
      if (materialVar) {
        materialVar.options.forEach((opt) => {
          map.set(opt, (map.get(opt) ?? 0) + 1);
        });
      }
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [produtos]);

  /** Faixa de preço global (para placeholders nos inputs) */
  const priceRange = useMemo(() => {
    if (!produtos || produtos.length === 0) return { min: 0, max: 500 };
    const prices = produtos.map((p) => parsePrice(p.price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min: Math.floor(min), max: Math.ceil(max) };
  }, [produtos]);

  const updateQuery = (updates: Partial<typeof query>) => {
    const next = new URLSearchParams(searchParams);
    if (updates.category !== undefined) {
      if (updates.category) next.set("category", updates.category);
      else next.delete("category");
    }
    if (updates.tag !== undefined) {
      if (updates.tag) next.set("tag", updates.tag);
      else next.delete("tag");
    }
    if (updates.sort !== undefined) {
      if (updates.sort && updates.sort !== "featured") next.set("sort", updates.sort);
      else next.delete("sort");
    }
    if (updates.minPrice !== undefined) {
      if (updates.minPrice != null && updates.minPrice > 0) next.set("minPrice", String(updates.minPrice));
      else next.delete("minPrice");
    }
    if (updates.maxPrice !== undefined) {
      if (updates.maxPrice != null && updates.maxPrice > 0) next.set("maxPrice", String(updates.maxPrice));
      else next.delete("maxPrice");
    }
    if (updates.material !== undefined) {
      if (updates.material) next.set("material", updates.material);
      else next.delete("material");
    }
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    if (!produtos) return [];
    let list = produtos;
    if (selectedCategory)
      list = list.filter((p) => p.category === selectedCategory);
    if (selectedTag)
      list = list.filter((p) => (p.tags ?? []).some((t) => t === selectedTag));
    if (selectedMinPrice != null && selectedMinPrice > 0) {
      list = list.filter((p) => parsePrice(p.price) >= selectedMinPrice);
    }
    if (selectedMaxPrice != null && selectedMaxPrice > 0) {
      list = list.filter((p) => parsePrice(p.price) <= selectedMaxPrice);
    }
    if (selectedMaterial) {
      list = list.filter((p) => {
        const materialVar = (p.variations ?? []).find(
          (v) => v.type.toLowerCase() === "material"
        );
        return materialVar?.options.includes(selectedMaterial) ?? false;
      });
    }
    return list;
  }, [
    produtos,
    selectedCategory,
    selectedTag,
    selectedMinPrice,
    selectedMaxPrice,
    selectedMaterial,
  ]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortBy === "featured") return list;
    if (sortBy === "price_asc")
      return list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "price_desc")
      return list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sortBy === "name")
      return list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [filtered, sortBy]);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const FiltersSidebar = ({ onSelectCategory }: { onSelectCategory?: () => void }) => (
    <aside className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
        Filtros
      </h3>

      {/* Faixa de preço */}
      <Collapsible defaultOpen className="space-y-2">
        <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          Faixa de preço
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pl-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor="filter-min-price" className="text-xs text-muted-foreground">
                Mín (R$)
              </Label>
              <Input
                id="filter-min-price"
                type="number"
                min={0}
                max={priceRange.max}
                placeholder={String(priceRange.min)}
                value={selectedMinPrice != null && selectedMinPrice > 0 ? selectedMinPrice : ""}
                onChange={(e) => {
                  const v = e.target.value;
                  const n = v === "" ? undefined : parseInt(v, 10);
                  updateQuery({ minPrice: n != null && !Number.isNaN(n) ? n : undefined });
                }}
                className="h-8 text-sm"
              />
            </div>
            <span className="text-muted-foreground pt-5">–</span>
            <div className="flex-1 space-y-1">
              <Label htmlFor="filter-max-price" className="text-xs text-muted-foreground">
                Máx (R$)
              </Label>
              <Input
                id="filter-max-price"
                type="number"
                min={0}
                max={priceRange.max}
                placeholder={String(priceRange.max)}
                value={selectedMaxPrice != null && selectedMaxPrice > 0 ? selectedMaxPrice : ""}
                onChange={(e) => {
                  const v = e.target.value;
                  const n = v === "" ? undefined : parseInt(v, 10);
                  updateQuery({ maxPrice: n != null && !Number.isNaN(n) ? n : undefined });
                }}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen className="space-y-2">
        <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          Categoria
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-1">
          <Link
            to={buildProdutosUrl({ ...query, category: undefined })}
            onClick={onSelectCategory}
            className={cn(
              "block w-full rounded-md py-1.5 px-2 text-left text-sm transition-colors",
              !selectedCategory
                ? "bg-primary/15 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Todas
          </Link>
          {categoriesWithCount.map(({ name, count }) => (
            <Link
              key={name}
              to={buildProdutosUrl({ ...query, category: name })}
              onClick={onSelectCategory}
              className={cn(
                "flex w-full items-center justify-between rounded-md py-1.5 px-2 text-left text-sm transition-colors",
                selectedCategory === name
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{name}</span>
              <span className="text-xs opacity-70">({count})</span>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Material */}
      {materialsWithCount.length > 0 && (
        <Collapsible defaultOpen className="space-y-2">
          <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Material
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-1">
            <Link
              to={buildProdutosUrl({ ...query, material: undefined })}
              onClick={onSelectCategory}
              className={cn(
                "block w-full rounded-md py-1.5 px-2 text-left text-sm transition-colors",
                !selectedMaterial
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              Todos
            </Link>
            {materialsWithCount.map(({ name, count }) => (
              <Link
                key={name}
                to={buildProdutosUrl({ ...query, material: name })}
                onClick={onSelectCategory}
                className={cn(
                  "flex w-full items-center justify-between rounded-md py-1.5 px-2 text-left text-sm transition-colors",
                  selectedMaterial === name
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{name}</span>
                <span className="text-xs opacity-70">({count})</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </aside>
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-16 sm:pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <Skeleton className="h-64 w-52 shrink-0 rounded-xl" />
            <div className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-[280px] w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background pt-16 sm:pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-destructive text-lg">
            Erro ao carregar produtos. Tente novamente mais tarde.
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!produtos || produtos.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-16 sm:pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden pt-16 sm:pt-20">
      <Navbar />

      {/* Header compacto */}
      <section className="border-b border-border py-3 sm:py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <h1 className="text-base sm:text-xl md:text-2xl font-bold">
              Produtos <span className="text-muted-foreground font-normal">({sorted.length} resultado{sorted.length !== 1 ? "s" : ""})</span>
            </h1>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile: botão Filtros abre Sheet */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs sm:text-sm h-8">
                    <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersSidebar onSelectCategory={() => setFiltersOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
              <Select value={sortBy} onValueChange={(v) => updateQuery({ sort: v as SortOption })}>
                <SelectTrigger className="w-[140px] sm:w-[180px] h-8 text-xs sm:text-sm">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Em destaque</SelectItem>
                  <SelectItem value="price_asc">Preço: menor primeiro</SelectItem>
                  <SelectItem value="price_desc">Preço: maior primeiro</SelectItem>
                  <SelectItem value="name">Nome A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo: sidebar + grid */}
      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 flex gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden md:block w-52 shrink-0">
            <div className="sticky top-20 rounded-xl border border-border bg-card/50 p-4">
              <FiltersSidebar />
            </div>
          </aside>

          {/* Grid de produtos */}
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {sorted.map((product: Produto, index: number) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  productPageUrl={`/produtos/${product.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Produtos;
