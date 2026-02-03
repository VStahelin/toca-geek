import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Share2, Copy, Layers } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useProdutos } from "@/hooks/useProdutos";
import { getRelatedProducts } from "@/lib/relatedProducts";
import { buildProdutosUrl } from "@/lib/productListUrl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Produto, ProdutoImage } from "@/lib/api/types";

const COLOR_HEX: Record<string, string> = {
  preto: "#1a1a1a",
  branco: "#f5f5f5",
  cinza: "#9ca3af",
  azul: "#3b82f6",
  vermelho: "#ef4444",
  verde: "#22c55e",
  amarelo: "#eab308",
  roxo: "#a855f7",
  rosa: "#ec4899",
  laranja: "#f97316",
  marrom: "#92400e",
};

function isHex(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
}

const ProdutoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: produtos, isLoading, error } = useProdutos();

  const product = produtos?.find((p) => p.id === parseInt(id ?? "0", 10));
  const related = product && produtos ? getRelatedProducts(product, produtos, 4) : [];

  const productImages: ProdutoImage[] = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) return product.images;
    return [{ url: product.image_url, alt: product.image_alt }];
  }, [product]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const shareUrl = useMemo(
    () =>
      `${window.location.origin}${window.location.pathname}#/produtos/${id}`,
    [id]
  );

  /** Mensagem de compartilhamento: título, preço e link */
  const shareMessage = useMemo(() => {
    const title = product?.title ?? "Produto";
    const price = product?.price?.trim();
    const parts = [`Confira na Toca Geek: ${title}`];
    if (price) parts.push(price);
    parts.push(shareUrl);
    return parts.join("\n");
  }, [product?.title, product?.price, shareUrl]);

  const copyToClipboard = (text: string, successLabel: string) => {
    navigator.clipboard.writeText(text).then(
      () => toast.success(successLabel),
      () => toast.error("Não foi possível copiar.")
    );
  };

  /** Compartilha com foto quando o navegador suportar (Web Share API com files); senão abre WhatsApp com a mensagem. */
  const handleShareWhatsApp = async () => {
    const imageUrl =
      productImages[0]?.url ?? product?.image_url;
    if (
      navigator.share &&
      imageUrl &&
      typeof navigator.canShare === "function"
    ) {
      try {
        const res = await fetch(imageUrl, { mode: "cors" });
        if (!res.ok) throw new Error("Fetch image failed");
        const blob = await res.blob();
        const file = new File(
          [blob],
          `toca-geek-${product?.title ?? "produto"}.jpg`.replace(/[^a-z0-9.-]/gi, "_"),
          { type: blob.type || "image/jpeg" }
        );
        if (navigator.canShare({ files: [file], text: shareMessage, url: shareUrl })) {
          await navigator.share({
            title: product?.title ?? "Produto - Toca Geek",
            text: shareMessage,
            url: shareUrl,
            files: [file],
          });
          toast.success("Compartilhado!");
          return;
        }
      } catch {
        /* fallback para wa.me */
      }
    }
    const text = encodeURIComponent(shareMessage);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    toast.success("Abrindo WhatsApp...");
  };

  const handleShareCopy = () => {
    copyToClipboard(shareMessage, "Mensagem copiada! Cole no WhatsApp ou onde quiser.");
  };

  if (isLoading || !produtos) {
    return (
      <main className="min-h-screen bg-background pt-16 sm:pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="aspect-square max-w-lg rounded-2xl mb-6" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
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
            Erro ao carregar o produto. Tente novamente mais tarde.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/produtos")}>
            Voltar aos produtos
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-16 sm:pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/produtos">Ver todos os produtos</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const hasShoppe = product.shoppe_url && product.shoppe_url.trim() !== "";
  const hasMercadoLivre =
    product.mercado_livre_url && product.mercado_livre_url.trim() !== "";

  return (
    <main className="min-h-screen bg-background overflow-x-hidden pt-16 sm:pt-20">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-6xl">
        {/* Breadcrumb: path do produto (filtros / hiperlinks) */}
        <Breadcrumb className="mb-4 sm:mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/produtos">Produtos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={buildProdutosUrl({ category: product.category })}>
                  {product.category}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-foreground truncate max-w-[180px] sm:max-w-none">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Detalhe do produto: [thumbnails | imagem] | descrição */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card overflow-hidden mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Coluna esquerda: thumbnails + imagem principal + share minimalista */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Thumbnails: vertical no desktop, horizontal no mobile */}
              {productImages.length > 1 && (
                <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={cn(
                        "relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors",
                        selectedImageIndex === idx
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground/30"
                      )}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
              {/* Imagem principal em destaque */}
              <div className="relative flex-1 min-h-0 aspect-square max-w-full rounded-xl overflow-hidden bg-muted order-1 sm:order-2">
                <img
                  src={productImages[selectedImageIndex]?.url ?? product.image_url}
                  alt={productImages[selectedImageIndex]?.alt ?? product.image_alt}
                  className="h-full w-full object-cover"
                  loading={selectedImageIndex === 0 ? "eager" : "lazy"}
                />
                {product.label && (
                  <div className="absolute left-3 top-3 z-10">
                    <Badge className="bg-primary/90 text-primary-foreground shadow-md">
                      {product.label}
                    </Badge>
                  </div>
                )}
                {/* Share minimalista: topo direito da área da imagem */}
                <div className="absolute right-3 top-3 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-9 w-9 rounded-full shadow-md bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        aria-label="Compartilhar"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={handleShareWhatsApp}>
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareCopy}>
                        Copiar link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Coluna direita: descrição e ações */}
            <div className="flex flex-col">
              <Badge variant="secondary" className="w-fit mb-2">
                {product.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:gradient-text transition-colors">
                {product.title}
              </h1>
              {product.price && (
                <p className="text-xl font-semibold text-primary mb-4">
                  {product.price}
                </p>
              )}
              <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                {product.description}
              </p>

              {/* Tags como hiperlinks para listagem filtrada */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  <span className="text-sm text-muted-foreground shrink-0">Tags:</span>
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={buildProdutosUrl({ tag })}
                      className="inline-flex"
                    >
                      <Badge
                        variant="outline"
                        className="hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              {/* Cores */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">Cores:</span>
                  {product.colors.map((color, i) => {
                    const hex = isHex(color)
                      ? color
                      : COLOR_HEX[color.toLowerCase()] ?? "#9ca3af";
                    return (
                      <span
                        key={i}
                        className="h-6 w-6 rounded-full border border-border shadow-inner"
                        style={{ backgroundColor: hex }}
                        title={color}
                      />
                    );
                  })}
                </div>
              )}

              {/* Variações */}
              {product.variations && product.variations.length > 0 && (
                <div className="space-y-2 mb-4">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                    <Layers className="h-4 w-4" />
                    Variações
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.variations.map((v, i) => (
                      <div key={i} className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm text-muted-foreground">{v.type}:</span>
                        <div className="flex flex-wrap gap-1">
                          {v.options.map((opt, j) => (
                            <Badge key={j} variant="secondary" className="font-normal">
                              {opt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disponível em: Shopee e Meli */}
              <div className="mt-auto pt-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Disponível em:
                </p>
                <div className="flex flex-wrap gap-3">
                  {hasShoppe && (
                    <a
                      href={product.shoppe_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#EE4D2D" }}
                    >
                      <img
                        src="/logos/Shopee.png"
                        alt=""
                        className="h-5 w-auto max-w-[80px] object-contain"
                      />
                    </a>
                  )}
                  {hasMercadoLivre && (
                    <a
                      href={product.mercado_livre_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#FFE600", color: "#002B8C" }}
                    >
                      <img
                        src="/logos/meli.png"
                        alt=""
                        className="h-5 w-auto max-w-[90px] object-contain"
                      />
                    </a>
                  )}
                  {!hasShoppe && !hasMercadoLivre && (
                    <span className="text-sm text-muted-foreground">
                      Links das lojas em breve.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Produtos relacionados */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Produtos relacionados
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {related.map((p, index) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={index}
                  productPageUrl={`/produtos/${p.id}`}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default ProdutoPage;
