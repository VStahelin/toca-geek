import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, MessageCircle, Layers, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

type Material = "resin" | "pla";
type Size = "small" | "medium" | "large";

const materialInfo = {
  resin: {
    name: "Resina",
    basePrice: 25,
    description: "Ultra-detalhe, acabamento suave",
  },
  pla: { name: "PLA", basePrice: 15, description: "Resistente e ecológico" },
};

const sizeInfo = {
  small: { name: "Pequeno", multiplier: 1, size: "Até 10cm" },
  medium: { name: "Médio", multiplier: 2.5, size: "10-20cm" },
  large: { name: "Grande", multiplier: 5, size: "20cm+" },
};

const QuoteCalculator = () => {
  const [material, setMaterial] = useState<Material>("resin");
  const [size, setSize] = useState<Size>("small");

  const estimatedPrice =
    materialInfo[material].basePrice * sizeInfo[size].multiplier;

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-hover p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl"
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 mb-3 sm:mb-4">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                Estimativa Rápida
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Solicite um <span className="gradient-text">Orçamento</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Selecione suas preferências para uma estimativa inicial de preço.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Options */}
            <div className="space-y-4 sm:space-y-6">
              {/* Material Selection */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">
                  <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
                  Tipo de Material
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {(Object.keys(materialInfo) as Material[]).map((mat) => (
                    <motion.button
                      key={mat}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMaterial(mat)}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-left ${
                        material === mat
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border bg-muted/50 hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="font-semibold text-foreground text-sm sm:text-base">
                        {materialInfo[mat].name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {materialInfo[mat].description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">
                  <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
                  Tamanho da Impressão
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {(Object.keys(sizeInfo) as Size[]).map((sz) => (
                    <motion.button
                      key={sz}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSize(sz)}
                      className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-center ${
                        size === sz
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border bg-muted/50 hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="font-semibold text-foreground text-xs sm:text-sm">
                        {sizeInfo[sz].name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {sizeInfo[sz].size}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-center mt-6 md:mt-0">
              <motion.div
                key={`${material}-${size}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20"
              >
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  Preço Estimado Inicial
                </p>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-3 sm:mb-4">
                  R${estimatedPrice}
                  <span className="text-base sm:text-lg text-muted-foreground font-normal">
                    +
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4 sm:mb-6">
                  Preço final varia conforme complexidade e nível de detalhe
                </p>

                <Button size="lg" className="w-full group text-sm sm:text-base">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Solicitar Orçamento via WhatsApp
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteCalculator;
