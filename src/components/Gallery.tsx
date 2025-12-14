import { motion } from "framer-motion";
import galleryDragon from "@/assets/gallery-dragon.png";
import galleryHelmet from "@/assets/gallery-helmet.png";
import galleryMech from "@/assets/gallery-mech.png";
import galleryLogo from "@/assets/gallery-logo.png";
import heroFigure from "@/assets/hero-figure.png";

const galleryImages = [
  { id: 1, title: "Anime Figure", category: "Collectible", image: heroFigure },
  { id: 2, title: "Dragon Miniature", category: "RPG", image: galleryDragon },
  { id: 3, title: "Cosplay Helmet", category: "Props", image: galleryHelmet },
  { id: 4, title: "Custom Logo", category: "Visual", image: galleryLogo },
  { id: 5, title: "Mech Statue", category: "Collectible", image: galleryMech },
  { id: 6, title: "D&D Miniatures", category: "RPG", image: galleryDragon },
  { id: 7, title: "Prop Helmet", category: "Props", image: galleryHelmet },
  { id: 8, title: "Brand Display", category: "Engineering", image: galleryLogo },
];

const Gallery = () => {
  // Double the array for seamless looping
  const duplicatedImages = [...galleryImages, ...galleryImages];
  const reversedImages = [...galleryImages].reverse();
  const duplicatedReversed = [...reversedImages, ...reversedImages];

  return (
    <section className="py-24 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="gradient-text">Geek</span> Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of passion projects, custom orders, and creative collaborations.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Left to Right */}
          <div className="flex gap-6 mb-6 animate-marquee hover:[animation-play-state:paused]">
            {duplicatedImages.map((image, index) => (
              <GalleryCard key={`row1-${index}`} image={image} />
            ))}
          </div>

          {/* Row 2 - Right to Left */}
          <div className="flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused]">
            {duplicatedReversed.map((image, index) => (
              <GalleryCard key={`row2-${index}`} image={image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GalleryCard = ({ image }: { image: { id: number; title: string; category: string; image: string } }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5, 
        rotateX: -5,
        z: 50
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      {/* Actual image */}
      <img 
        src={image.image} 
        alt={image.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-background/90 via-background/30 to-transparent">
        <span className="text-xs font-medium text-primary mb-1">{image.category}</span>
        <h3 className="text-lg font-bold text-foreground">{image.title}</h3>
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
