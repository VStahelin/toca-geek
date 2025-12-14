import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, MessageCircle, Layers, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

type Material = "resin" | "pla";
type Size = "small" | "medium" | "large";

const materialInfo = {
  resin: { name: "Resin", basePrice: 25, description: "Ultra-detail, smooth finish" },
  pla: { name: "PLA", basePrice: 15, description: "Durable, eco-friendly" },
};

const sizeInfo = {
  small: { name: "Small", multiplier: 1, size: "Up to 10cm" },
  medium: { name: "Medium", multiplier: 2.5, size: "10-20cm" },
  large: { name: "Large", multiplier: 5, size: "20cm+" },
};

const QuoteCalculator = () => {
  const [material, setMaterial] = useState<Material>("resin");
  const [size, setSize] = useState<Size>("small");

  const estimatedPrice = materialInfo[material].basePrice * sizeInfo[size].multiplier;

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-hover p-8 md:p-12 rounded-3xl"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <Calculator className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Quick Estimate</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Get a <span className="gradient-text">Price Estimate</span>
            </h2>
            <p className="text-muted-foreground">
              Select your preferences for an instant starting price range.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Options */}
            <div className="space-y-6">
              {/* Material Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                  <Layers className="w-4 h-4" />
                  Material Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(materialInfo) as Material[]).map((mat) => (
                    <motion.button
                      key={mat}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMaterial(mat)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        material === mat
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border bg-muted/50 hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="font-semibold text-foreground">{materialInfo[mat].name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {materialInfo[mat].description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                  <Maximize className="w-4 h-4" />
                  Print Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(Object.keys(sizeInfo) as Size[]).map((sz) => (
                    <motion.button
                      key={sz}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSize(sz)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                        size === sz
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border bg-muted/50 hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="font-semibold text-foreground text-sm">{sizeInfo[sz].name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {sizeInfo[sz].size}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col justify-center">
              <motion.div
                key={`${material}-${size}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20"
              >
                <p className="text-sm text-muted-foreground mb-2">Estimated Starting Price</p>
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">
                  R${estimatedPrice}
                  <span className="text-lg text-muted-foreground font-normal">+</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  Final price varies based on complexity and detail level
                </p>

                <Button size="lg" className="w-full group">
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get Full Quote via WhatsApp
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
