import { motion } from "framer-motion";
import { Gamepad2, Sword, Cog, Shapes } from "lucide-react";
import serviceCollectibles from "@/assets/service-collectibles.png";
import galleryHelmet from "@/assets/gallery-helmet.png";

const services = [
  {
    id: 1,
    title: "Colecionáveis & Figuras",
    description:
      "Estatuetas de anime, personagens de jogos e figuras personalizadas com acabamento de qualidade museu.",
    icon: Gamepad2,
    size: "large",
    image: serviceCollectibles,
  },
  {
    id: 2,
    title: "Props de Cosplay",
    description:
      "Capacetes, armas, peças de armadura. Dê vida aos seus personagens favoritos.",
    icon: Sword,
    size: "medium",
    image: galleryHelmet,
  },
  {
    id: 3,
    title: "Peças de Engenharia",
    description:
      "Protótipos de precisão e componentes funcionais para seus projetos.",
    icon: Cog,
    size: "medium",
  },
  {
    id: 4,
    title: "Comunicação Visual",
    description: "Logos 3D, placas e displays para marca.",
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
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            O Que <span className="gradient-text">Criamos</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
            De miniaturas de bolso a props em tamanho real. Cada impressão conta
            uma história.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[160px] sm:auto-rows-[180px]"
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
                className={`group relative glass-card-hover p-4 sm:p-6 flex flex-col justify-between cursor-pointer overflow-hidden ${sizeClasses}`}
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
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 sm:mb-4"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </motion.div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="relative z-10 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-medium mr-2">Explorar</span>
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
