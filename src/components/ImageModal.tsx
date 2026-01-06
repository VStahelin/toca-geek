import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Share2, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GaleriaImage, GaleriaProject } from "@/lib/api/types";

interface ImageModalProps {
  project: GaleriaProject;
  initialImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal = ({
  project,
  initialImageIndex,
  isOpen,
  onClose,
}: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Atualiza o índice quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialImageIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, initialImageIndex]);

  // Navegação com teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const currentImage = project.images[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.25, 1);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Zoom com scroll do mouse
  const handleWheel = (e: React.WheelEvent) => {
    if (!imageRef.current) return;
    e.preventDefault();

    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(scale + delta, 1), 3);
    setScale(newScale);

    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Drag para mover imagem quando zoom > 1
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Compartilhar projeto
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/#/galeria?project=${project.id}`;
    const shareText = `Confira este projeto: ${project.title} - ${project.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // Usuário cancelou ou erro
        console.log("Compartilhamento cancelado");
      }
    } else {
      // Fallback: copiar para clipboard
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/#/galeria?project=${project.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] sm:h-[95vh] p-0 gap-0 bg-background/95 backdrop-blur-sm border-0 overflow-hidden">
        <div className="relative w-full h-full flex flex-col">
          {/* Header com controles */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-background/90 to-transparent gap-2 sm:gap-4">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground truncate">
                {project.title}
              </h3>
              <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0 whitespace-nowrap">
                {currentIndex + 1} / {project.images.length}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Botões de zoom */}
              <div className="hidden sm:flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-lg p-1 border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomOut}
                  disabled={scale <= 1}
                  className="h-7 w-7 sm:h-8 sm:w-8"
                >
                  <ZoomOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <span className="text-xs text-muted-foreground min-w-[2.5rem] sm:min-w-[3rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomIn}
                  disabled={scale >= 3}
                  className="h-7 w-7 sm:h-8 sm:w-8"
                >
                  <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                {scale > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleResetZoom}
                    className="h-7 w-7 sm:h-8 sm:w-8 ml-1"
                  >
                    <span className="text-xs">1:1</span>
                  </Button>
                )}
              </div>

              {/* Botão de compartilhar */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="h-7 w-7 sm:h-8 sm:w-8"
                title="Compartilhar projeto"
              >
                <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>

              {/* Botão de copiar link */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyLink}
                className="h-7 w-7 sm:h-8 sm:w-8"
                title="Copiar link"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
              </Button>

              {/* Botão de fechar */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-7 w-7 sm:h-8 sm:w-8"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* Área da imagem com zoom e drag */}
          <div
            ref={containerRef}
            className="flex-1 relative overflow-hidden bg-black/50"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.img
                  ref={imageRef}
                  src={currentImage.url}
                  alt={currentImage.alt}
                  className="max-w-full max-h-full object-contain select-none"
                  style={{
                    transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                    transition: isDragging ? "none" : "transform 0.1s ease-out",
                  }}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navegação entre imagens */}
            {project.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 border"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 border"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </>
            )}

            {/* Indicadores de imagens (dots) */}
            {project.images.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-background/80 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1.5 sm:py-2 border max-w-[90%] overflow-x-auto">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setScale(1);
                      setPosition({ x: 0, y: 0 });
                    }}
                    className={cn(
                      "h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all flex-shrink-0",
                      index === currentIndex
                        ? "bg-primary w-4 sm:w-6"
                        : "bg-muted-foreground/50 hover:bg-muted-foreground"
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer com informações do projeto */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-background/90 to-transparent">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1 flex-1 min-w-0">
                {currentImage.alt || project.description}
              </p>
              {project.instagram_url && (
                <a
                  href={project.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm hover:text-primary transition-colors underline-offset-4 hover:underline flex-shrink-0 whitespace-nowrap"
                >
                  Ver no Instagram →
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

