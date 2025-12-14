import { motion } from "framer-motion";
import { Flame, Target, Zap, Heart } from "lucide-react";

const stats = [
  {
    icon: Target,
    value: "500+",
    label: "Projects Completed",
    description: "Quest milestones achieved",
    color: "text-primary",
  },
  {
    icon: Flame,
    value: "50kg",
    label: "Filament Used",
    description: "Material mastery level",
    color: "text-secondary",
  },
  {
    icon: Zap,
    value: "98%",
    label: "Client Satisfaction",
    description: "Reputation score",
    color: "text-primary",
  },
  {
    icon: Heart,
    value: "100%",
    label: "Geek Passion",
    description: "Core attribute",
    color: "text-secondary",
  },
];

const Stats = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      
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
            Character <span className="gradient-text">Stats</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our journey in numbers. Every stat represents countless hours of dedication.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card-hover p-6 text-center group cursor-default"
              >
                {/* Icon with RPG-style frame */}
                <div className="relative mx-auto w-20 h-20 mb-4">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-muted-foreground/20 group-hover:border-primary/50 transition-colors duration-300" />
                  
                  {/* Inner glow */}
                  <div className="absolute inset-2 rounded-full bg-gradient-primary opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Icon container */}
                  <div className="absolute inset-3 rounded-full bg-muted flex items-center justify-center">
                    <Icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>

                  {/* Corner accents - RPG style */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Value */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-bold gradient-text mb-2"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>

                {/* Progress bar - decorative */}
                <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-gradient-primary rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
