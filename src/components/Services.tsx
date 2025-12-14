import { motion } from "framer-motion";
import { Gamepad2, Sword, Cog, Shapes } from "lucide-react";
import serviceCollectibles from "@/assets/service-collectibles.png";
import galleryHelmet from "@/assets/gallery-helmet.png";

const services = [
  {
    id: 1,
    title: "Collectibles & Figures",
    description: "High-detail anime statues, game characters, and custom figurines with museum-quality finishes.",
    icon: Gamepad2,
    size: "large",
    image: serviceCollectibles,
  },
  {
    id: 2,
    title: "Cosplay Props",
    description: "Helmets, weapons, armor pieces. Bring your favorite characters to life.",
    icon: Sword,
    size: "medium",
    image: galleryHelmet,
  },
  {
    id: 3,
    title: "Engineering Parts",
    description: "Precision prototypes and functional components for your projects.",
    icon: Cog,
    size: "medium",
  },
  {
    id: 4,
    title: "Visual Communication",
    description: "3D logos, signs, and brand displays.",
    icon: Shapes,
    size: "small",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Services = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="gradient-text">Create</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From pocket-sized miniatures to life-sized props. Every print tells a story.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[180px]"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const sizeClasses =
              service.size === "large"
                ? "md:col-span-2 md:row-span-2"
                : service.size === "medium"
                ? "lg:row-span-2"
                : "";

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`group relative glass-card-hover p-6 flex flex-col justify-between cursor-pointer overflow-hidden ${sizeClasses}`}
              >
                {/* Background image for cards with images */}
                {service.image && (
                  <div className="absolute inset-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4"
                  >
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="relative z-10 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-medium mr-2">Explore</span>
                  <span>→</span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rotate-45" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
