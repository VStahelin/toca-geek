import { motion } from "framer-motion";
import { Gamepad2, Sword, Cog, Shapes } from "lucide-react";
import { useServicos } from "@/hooks/useServicos";
import { Skeleton } from "@/components/ui/skeleton";
import type { Servico } from "@/lib/api/types";

// Mapeamento de ícones
const iconMap: Record<string, typeof Gamepad2> = {
  gamepad: Gamepad2,
  sword: Sword,
  gear: Cog,
  cube: Shapes,
};

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
  const { data: servicos, isLoading, error } = useServicos();

  // Se estiver carregando, mostra skeleton
  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Se houver erro, mostra mensagem
  if (error || !servicos) {
    return (
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="container mx-auto relative z-10 text-center">
          <p className="text-destructive">Erro ao carregar serviços. Tente novamente mais tarde.</p>
        </div>
      </section>
    );
  }

  // Determina o tamanho baseado na ordem (primeiro é grande, outros médios/pequenos)
  const getSizeClasses = (index: number, total: number) => {
    if (index === 0) return "md:col-span-2 md:row-span-2";
    if (index === 1 || index === 2) return "lg:row-span-2";
    return "";
  };

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
          {servicos.map((service: Servico, index: number) => {
            const Icon = iconMap[service.icon] || Gamepad2;
            const sizeClasses = getSizeClasses(index, servicos.length);

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`group relative glass-card-hover p-4 sm:p-6 flex flex-col justify-between cursor-pointer overflow-hidden ${sizeClasses} ${
                  service.is_coming_soon ? "opacity-75" : ""
                }`}
              >
                {/* Faixa "Em Breve" */}
                {service.is_coming_soon && (
                  <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
                    Em Breve
                  </div>
                )}
                
                {/* Badge Premium */}
                {service.is_premium && !service.is_coming_soon && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-20 shadow-lg">
                    ⭐ Premium
                  </div>
                )}

                {/* Background image/gif for cards with images */}
                {service.image && (
                  <div className="absolute inset-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                      loading={service.image.endsWith('.gif') ? 'eager' : 'lazy'}
                      decoding={service.image.endsWith('.gif') ? 'auto' : 'async'}
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
                {!service.is_coming_soon && (
                  <div className="relative z-10 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                    <span className="text-sm font-medium mr-2">Explorar</span>
                    <span>→</span>
                  </div>
                )}

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
