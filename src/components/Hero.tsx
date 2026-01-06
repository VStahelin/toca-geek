import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroFigure from "@/assets/hero-figure.png";
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient grid-pattern pt-20 md:pt-0">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-primary/20 blur-3xl"
          style={{ top: "10%", left: "10%" }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full bg-secondary/20 blur-3xl"
          style={{ bottom: "20%", right: "10%" }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 -ml-2 sm:-ml-4 md:-ml-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Estúdio de Impressão 3D
              </span>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <img
                src="/logos/logo-white.png"
                alt="Toca Geek logo"
                className="h-44 sm:h-44 md:h-44 lg:h-44 xl:h-52 w-auto"
              />
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-orbitron font-bold tracking-tight leading-none mb-4 md:mb-6">
              <span className="gradient-text">Toca Geek</span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed px-2 sm:px-0"
            >
              De miniaturas personalizadas a protótipos industriais. Se você
              pode imaginar,{" "}
              <span className="text-foreground font-medium">
                a Toca Geek imprime.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="group">
                <Rocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Entrar em Contato
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/galeria">Ver Galeria</Link>
              </Button>
            </motion.div>

            {/* Stats mini */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12 justify-center lg:justify-start"
            >
              {[
                { value: "100%", label: "Geek" },
                { value: "Alta", label: "Qualidade" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl sm:text-2xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Floating 3D Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center mt-8 lg:mt-0"
          >
            <div className="relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-30 scale-90" />

              {/* Main floating card */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative glass-card-hover p-2 sm:p-4 rounded-3xl"
              >
                {/* Hero Figure Image */}
                <div className="w-56 h-64 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden">
                  <img
                    src={heroFigure}
                    alt="Figura colecionável de anime impressa em 3D com alta qualidade"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass-card px-2 py-1 sm:px-4 sm:py-2 rounded-full"
                >
                  <span className="text-xs sm:text-sm font-medium gradient-text">
                    PLA / Resina
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 glass-card px-2 py-1 sm:px-4 sm:py-2 rounded-full"
                >
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    ✨ Ultra Detalhe
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
