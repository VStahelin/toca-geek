import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEmpresas } from "@/hooks/useEmpresas";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BorderBeam } from "@/components/ui/border-beam";
import { ExternalLink } from "lucide-react";
import type { Empresa } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const Companies = () => {
  const { data: empresas, isLoading, error } = useEmpresas();
  const [isDragging, setIsDragging] = useState(false);
  const [animationPaused, setAnimationPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDraggingRef = useRef(false);
  const currentX = useRef(0);

  // Handlers para touch nativo - DEVE estar antes dos early returns
  useEffect(() => {
    const element = marqueeRef.current;
    if (!element || !empresas || empresas.length === 0) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
        isDraggingRef.current = false;
        currentX.current = 0;
        
        // Pausa a animação
        setAnimationPaused(true);
        element.style.animationPlayState = 'paused';
        
        // Captura a posição atual
        const computedStyle = window.getComputedStyle(element);
        const transform = computedStyle.transform;
        if (transform && transform !== 'none') {
          const matrix = new DOMMatrix(transform);
          currentX.current = matrix.e;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = Math.abs(touch.clientY - touchStartY.current);
      
      // Se movimento horizontal for maior que vertical, é arrasto
      if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
        if (!isDraggingRef.current) {
          isDraggingRef.current = true;
          setIsDragging(true);
        }
        
        // Previne scroll e outros comportamentos
        e.preventDefault();
        
        // Atualiza a posição
        const newX = currentX.current + deltaX;
        dragX.set(newX);
        element.style.transform = `translateX(${newX}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        
        // Retoma a animação após delay
        setTimeout(() => {
          setAnimationPaused(false);
          element.style.animationPlayState = 'running';
          dragX.set(0);
          element.style.transform = '';
        }, 2000);
      } else {
        // Se não arrastou, apenas retoma a animação
        setAnimationPaused(false);
        element.style.animationPlayState = 'running';
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [empresas, dragX, setAnimationPaused]);

  // Se estiver carregando, mostra skeleton
  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 sm:gap-6 justify-center">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-80 w-full max-w-sm rounded-3xl flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Se houver erro ou não houver empresas, não mostra nada
  if (error || !empresas || empresas.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-visible z-20">
      {/* Background gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Empresas que <span className="gradient-text">Confiaram</span> em Nossos Serviços
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Parceiros que escolheram a Toca Geek para transformar suas ideias em realidade
          </p>
        </motion.div>

        {/* Companies Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto relative py-8 z-30"
        >
          {/* Mobile: Marquee Animation with Drag */}
          <div className="block sm:hidden relative overflow-hidden">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Duplicate empresas for seamless loop */}
            <div
              ref={marqueeRef}
              style={{
                paddingLeft: 'calc(50vw - 140px)',
                width: 'max-content',
                touchAction: 'pan-x',
              }}
              className={cn(
                "flex gap-4 animate-marquee select-none",
                animationPaused && "[animation-play-state:paused]"
              )}
            >
              {[...empresas, ...empresas].map((empresa: Empresa, index: number) => {
                const neonColors = [
                  { from: "#9E7AFF", to: "#FE8BBB" },
                  { from: "#4FACFE", to: "#00F2FE" },
                ];
                const colors = neonColors[index % neonColors.length];
                
                return (
                  <div key={`${empresa.id}-${index}`} className="flex-shrink-0 w-[280px] relative z-30">
                    <motion.a
                      href={empresa.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index % empresas.length) * 0.1 }}
                      className="group relative block h-full"
                      style={{ 
                        zIndex: 30 + index,
                        touchAction: 'none',
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none',
                        pointerEvents: isDragging ? 'none' : 'auto',
                      }}
                      onClick={(e) => {
                        // Se estiver arrastando, previne o clique
                        if (isDragging || isDraggingRef.current) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "min-h-[280px] w-full border-2 border-primary/30 bg-card/40 backdrop-blur-md",
                          "p-4 transition-all duration-300 rounded-xl",
                          "relative overflow-hidden",
                          "flex flex-col"
                        )}
                      >
                        <BorderBeam
                          size={80}
                          duration={6}
                          delay={(index % empresas.length) * 0.3}
                          colorFrom={colors.from}
                          colorTo={colors.to}
                          borderWidth={2}
                        />
                        
                        <div className="relative z-10 flex flex-col items-center text-center space-y-3 h-full flex-1 justify-between">
                          {/* Logo */}
                          <div className="relative w-full flex justify-center items-center h-20 flex-shrink-0">
                            <img
                              src={empresa.logo}
                              alt={`Logo ${empresa.name}`}
                              className="h-16 w-auto object-contain max-w-full opacity-100"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>

                          {/* Company Name */}
                          <h3 className="text-sm font-bold text-foreground line-clamp-2 min-h-[2.5rem] flex items-center justify-center px-2">
                            {empresa.name}
                          </h3>

                          {/* Description */}
                          <div className="flex-1 flex items-start justify-center min-h-[3rem] w-full px-2">
                            {empresa.short_description ? (
                              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                                {empresa.short_description}
                              </p>
                            ) : (
                              <div className="min-h-[3rem]" />
                            )}
                          </div>

                          {/* External Link Icon */}
                          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground flex-shrink-0 mt-auto">
                            <span>Visitar site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Interactive Carousel */}
          <div className="hidden sm:block relative px-8 md:px-12">
            <Carousel
              opts={{
                align: "center",
                loop: empresas.length > 2,
                slidesToScroll: 1,
              }}
              className="w-full overflow-visible"
            >
              <CarouselContent className="-ml-2 md:-ml-4 overflow-visible justify-center">
                {empresas.map((empresa: Empresa, index: number) => {
                  // Cores neon variadas
                  const neonColors = [
                    { from: "#9E7AFF", to: "#FE8BBB" },
                    { from: "#4FACFE", to: "#00F2FE" },
                  ];
                  const colors = neonColors[index % neonColors.length];
                  
                  return (
                    <CarouselItem
                      key={empresa.id}
                      className="pl-2 md:pl-4 basis-auto flex-shrink-0 relative z-30"
                    >
                      <div className="p-3">
                        <motion.a
                          href={empresa.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="group relative block h-full touch-manipulation"
                          style={{ zIndex: 30 + index }}
                        >
                          <div
                            className={cn(
                              "min-h-[280px] w-full max-w-[280px] mx-auto border-2 border-primary/30 bg-card/40 backdrop-blur-md",
                              "p-4 sm:p-5 transition-all duration-300 rounded-xl",
                              "md:hover:border-primary/80 md:hover:shadow-neon",
                              "md:hover:bg-card/60 relative overflow-visible",
                              "will-change-transform flex flex-col"
                            )}
                          >
                            <BorderBeam
                              size={80}
                              duration={6}
                              delay={index * 0.3}
                              colorFrom={colors.from}
                              colorTo={colors.to}
                              borderWidth={2}
                            />
                            
                            <div className="relative z-10 flex flex-col items-center text-center space-y-3 h-full flex-1 justify-between overflow-visible">
                              {/* Logo */}
                              <div className="relative w-full flex justify-center items-center h-20 sm:h-24 flex-shrink-0 overflow-visible">
                                <motion.img
                                  src={empresa.logo}
                                  alt={`Logo ${empresa.name}`}
                                  className={cn(
                                    "h-16 sm:h-20 w-auto object-contain max-w-full",
                                    "transition-all duration-500",
                                    "opacity-100"
                                  )}
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>

                              {/* Company Name */}
                              <h3 className="text-sm sm:text-base font-bold text-foreground md:group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem] flex items-center justify-center px-2">
                                {empresa.name}
                              </h3>

                              {/* Description */}
                              <div className="flex-1 flex items-start justify-center min-h-[3rem] w-full px-2">
                                {empresa.short_description ? (
                                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                                    {empresa.short_description}
                                  </p>
                                ) : (
                                  <div className="min-h-[3rem]" />
                                )}
                              </div>

                              {/* External Link Icon */}
                              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground md:group-hover:text-primary transition-colors flex-shrink-0 mt-auto">
                                <span>Visitar site</span>
                                <ExternalLink className="w-3.5 h-3.5 transform md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {empresas.length > 1 && (
                <>
                  <CarouselPrevious className="-left-12 md:-left-16 bg-background/90 backdrop-blur-md border-2 border-primary/40 hover:border-primary/80 hover:shadow-neon hover:bg-background" />
                  <CarouselNext className="-right-12 md:-right-16 bg-background/90 backdrop-blur-md border-2 border-primary/40 hover:border-primary/80 hover:shadow-neon hover:bg-background" />
                </>
              )}
            </Carousel>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Companies;

