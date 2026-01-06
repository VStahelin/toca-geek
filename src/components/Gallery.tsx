import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGaleria } from "@/hooks/useGaleria";
import { Button } from "@/components/ui/button";
import type { GaleriaProject } from "@/lib/api/types";

const Gallery = () => {
  // Na home, mostramos todos os projetos
  const { data: galeria, isLoading, error } = useGaleria();

  // Se estiver carregando, mostra estado de loading
  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Carregando galeria...</p>
        </div>
      </section>
    );
  }

  // Se houver erro, mostra mensagem
  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">
            Erro ao carregar galeria. Tente novamente mais tarde.
          </p>
        </div>
      </section>
    );
  }

  // Se não houver dados, retorna vazio
  if (!galeria || galeria.length === 0) {
    return null;
  }

  // Transforma os dados da API para o formato esperado pelo componente
  const galleryImages = galeria.map((projeto: GaleriaProject) => ({
    id: projeto.id,
    title: projeto.title,
    category: projeto.category,
    image:
      projeto.images.find((img) => img.is_primary)?.url ||
      projeto.images[0]?.url ||
      "",
  }));

  // Double the array for seamless looping
  const duplicatedImages = [...galleryImages, ...galleryImages];
  const reversedImages = [...galleryImages].reverse();
  const duplicatedReversed = [...reversedImages, ...reversedImages];

  return (
    <section className="py-12 sm:py-16 md:py-24 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            A Galeria <span className="gradient-text">Geek</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Um showcase de projetos apaixonantes, encomendas personalizadas e
            colaborações criativas.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button asChild size="lg" variant="outline" className="group">
              <Link to="/galeria" className="flex items-center gap-2">
                Ver Todos os Projetos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Left to Right */}
          <div className="flex gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 animate-marquee hover:[animation-play-state:paused]">
            {duplicatedImages.map((image, index) => (
              <GalleryCard key={`row1-${index}`} image={image} />
            ))}
          </div>

          {/* Row 2 - Right to Left */}
          <div className="flex gap-3 sm:gap-4 md:gap-6 animate-marquee-reverse hover:[animation-play-state:paused]">
            {duplicatedReversed.map((image, index) => (
              <GalleryCard key={`row2-${index}`} image={image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface GalleryCardProps {
  image: {
    id: number;
    title: string;
    category: string;
    image: string;
  };
}

const GalleryCard = ({ image }: GalleryCardProps) => {
  return (
    <Link to="/galeria">
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
        z: 50,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex-shrink-0 w-56 h-36 sm:w-64 sm:h-44 md:w-72 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      {/* Actual image */}
      <img
        src={image.image}
        alt={image.title}
          loading="lazy"
          decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 bg-gradient-to-t from-background/90 via-background/30 to-transparent">
        <span className="text-xs font-medium text-primary mb-0.5 sm:mb-1">
          {image.category}
        </span>
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground">
          {image.title}
        </h3>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ring-2 ring-primary/50" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>
    </motion.div>
    </Link>
  );
};

export default Gallery;
