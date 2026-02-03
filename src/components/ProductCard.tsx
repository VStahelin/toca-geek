import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Produto } from "@/lib/api/types";

/** Mapa de nomes de cor para hex (fallback quando product.colors é string) */
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

interface ProductCardProps {
  product: Produto;
  index: number;
  /** Se informado, imagem e título/descrição viram link para a página do produto */
  productPageUrl?: string;
}

export const ProductCard = ({ product, index, productPageUrl }: ProductCardProps) => {
  const hasShoppe = product.shoppe_url && product.shoppe_url.trim() !== "";
  const hasMercadoLivre =
    product.mercado_livre_url && product.mercado_livre_url.trim() !== "";
  const hasColors = product.colors && product.colors.length > 0;
  const hasTags = product.tags && product.tags.length > 0;

  const mainImageUrl = product.images?.[0]?.url ?? product.image_url;
  const mainImageAlt = product.images?.[0]?.alt ?? product.image_alt;

  const wrapperClassName = "flex-1 min-h-0 flex flex-col overflow-hidden";
  const content = (
    <>
        {/* Imagem (primeira da galeria ou image_url) */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={mainImageUrl}
            alt={mainImageAlt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.label && (
            <div className="absolute left-2 top-2 z-10">
              <Badge className="bg-primary/90 text-primary-foreground text-[10px] shadow-md">
                {product.label}
              </Badge>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="flex flex-1 flex-col p-2 sm:p-4 space-y-1.5 sm:space-y-2 min-h-0">
          {hasColors ? (
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5" aria-label="Cores disponíveis">
              {product.colors!.slice(0, 6).map((color, i) => {
                const hex = isHex(color) ? color : COLOR_HEX[color.toLowerCase()] ?? "#9ca3af";
                return (
                  <span
                    key={i}
                    className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 rounded-full border border-border shadow-inner"
                    style={{ backgroundColor: hex }}
                    title={color}
                  />
                );
              })}
              {(product.colors!.length ?? 0) > 6 && (
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">+{product.colors!.length - 6}</span>
              )}
            </div>
          ) : hasTags ? (
            <div className="flex flex-wrap gap-0.5 sm:gap-1">
              {product.tags!.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 font-normal">
                  {tag}
                </Badge>
              ))}
              {(product.tags!.length ?? 0) > 4 && (
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">+{product.tags!.length - 4}</span>
              )}
            </div>
          ) : null}

          <h3 className="text-xs sm:text-sm font-bold leading-tight group-hover:gradient-text transition-colors line-clamp-2">
            {product.title}
          </h3>
          {product.price && (
            <p className="text-xs sm:text-sm font-semibold text-primary">{product.price}</p>
          )}
          <p className="text-muted-foreground text-[10px] sm:text-xs leading-snug line-clamp-2 flex-1 min-h-0">
            {product.description}
          </p>
        </div>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card glass-card-hover h-full"
    >
      {productPageUrl ? (
        <Link to={productPageUrl} className={`block ${wrapperClassName}`}>
          {content}
        </Link>
      ) : (
        <div className={wrapperClassName}>{content}</div>
      )}

      {/* Botões fora do link (evita aninhar <a> em <a>) */}
      <div className="p-2 sm:p-4 pt-0 flex flex-wrap gap-1 sm:gap-1.5">
        {hasShoppe && (
          <a
            href={product.shoppe_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 sm:h-8 flex-1 min-w-0 items-center justify-center gap-1 rounded-md px-1.5 sm:px-2 transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card"
            style={{ backgroundColor: "#EE4D2D" }}
            aria-label="Ver na Shopee"
          >
            <img src="/logos/Shopee.png" alt="" className="h-4 w-auto max-w-[60px] sm:max-w-[72px] object-contain" />
          </a>
        )}
        {hasMercadoLivre && (
          <a
            href={product.mercado_livre_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 sm:h-8 flex-1 min-w-0 items-center justify-center gap-1 rounded-md px-1.5 sm:px-2 transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card"
            style={{ backgroundColor: "#FFE600" }}
            aria-label="Ver no Mercado Livre"
          >
            <img src="/logos/meli.png" alt="" className="h-4 w-auto max-w-[70px] sm:max-w-[84px] object-contain" />
          </a>
        )}
      </div>
    </motion.article>
  );
};
