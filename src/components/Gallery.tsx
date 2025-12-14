import { motion } from "framer-motion";
import galleryDragon from "@/assets/gallery-dragon.png";
import galleryHelmet from "@/assets/gallery-helmet.png";
import galleryMech from "@/assets/gallery-mech.png";
import galleryLogo from "@/assets/gallery-logo.png";
import heroFigure from "@/assets/hero-figure.png";

const galleryImages = [
  { id: 1, title: "Figura Anime", category: "Colecionável", image: heroFigure },
  { id: 2, title: "Miniatura Dragão", category: "RPG", image: galleryDragon },
  { id: 3, title: "Capacete Cosplay", category: "Props", image: galleryHelmet },
  {
    id: 4,
    title: "Logo Personalizado",
    category: "Visual",
    image: galleryLogo,
  },
  {
    id: 5,
    title: "Estatueta Mech",
    category: "Colecionável",
    image: galleryMech,
  },
  { id: 6, title: "Miniaturas D&D", category: "RPG", image: galleryDragon },
  { id: 7, title: "Prop Capacete", category: "Props", image: galleryHelmet },
  {
    id: 8,
    title: "Display de Marca",
    category: "Engenharia",
    image: galleryLogo,
  },
];

const Gallery = () => {
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
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Um showcase de projetos apaixonantes, encomendas personalizadas e
            colaborações criativas.
          </p>
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

const GalleryCard = ({
  image,
}: {
  image: { id: number; title: string; category: string; image: string };
}) => {
  return (
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
  );
};

export default Gallery;
