import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useServicos } from "@/hooks/useServicos";
import { useFAQ } from "@/hooks/useFAQ";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gamepad2, Sword, Cog, Shapes, Rocket, HelpCircle } from "lucide-react";
import { MarkdownText } from "@/components/MarkdownText";
import type { Servico } from "@/lib/api/types";
import type { FAQ } from "@/lib/api/types";

// Mapeamento de ícones
const iconMap: Record<string, typeof Gamepad2> = {
  gamepad: Gamepad2,
  sword: Sword,
  gear: Cog,
  cube: Shapes,
  rocket: Rocket,
};

const Servicos = () => {
  const { data: servicos, isLoading, error } = useServicos();
  const { data: faq, isLoading: faqLoading } = useFAQ();

  // Se estiver carregando, mostra skeleton
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <section className="py-12 sm:py-16 md:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 text-center pt-8 sm:pt-12 md:pt-16">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  // Se houver erro, mostra mensagem
  if (error || !servicos) {
    return (
      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <section className="py-12 sm:py-16 md:py-24 relative">
          <div className="container mx-auto px-4 text-center pt-8 sm:pt-12 md:pt-16">
            <p className="text-destructive text-xl">
              Erro ao carregar serviços. Por favor, tente novamente mais tarde.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <section className="py-12 sm:py-16 md:py-24 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-8 sm:pt-12 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Nossos <span className="gradient-text">Serviços</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
              Transformamos ideias em realidade através da impressão 3D. Conheça nossos serviços especializados.
            </p>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Cada serviço é <span className="font-semibold text-foreground">personalizado para cada cliente</span>, onde damos suporte em todo o processo, bem de perto com todo cuidado.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicos.map((servico: Servico, index: number) => {
              const Icon = iconMap[servico.icon] || Gamepad2;

              return (
                <motion.div
                  key={servico.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative glass-card-hover p-6 sm:p-8 flex flex-col justify-between cursor-pointer overflow-hidden h-full ${
                    servico.is_coming_soon ? "opacity-75" : ""
                  }`}
                >
                  {/* Faixa "Em Breve" */}
                  {servico.is_coming_soon && (
                    <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
                      Em Breve
                    </div>
                  )}

                  {/* Background image/gif for cards with images */}
                  {servico.image && (
                    <div className="absolute inset-0">
                      <img 
                        src={servico.image} 
                        alt={servico.title}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                        loading={servico.image.endsWith('.gif') ? 'eager' : 'lazy'}
                        decoding={servico.image.endsWith('.gif') ? 'auto' : 'async'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 sm:mb-6"
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                      {servico.title}
                    </h3>

                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {servico.description}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  {!servico.is_coming_soon && (
                    <div className="relative z-10 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 mt-4">
                      <span className="text-sm font-medium mr-2">Saiba Mais</span>
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
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      {faq && faq.length > 0 && (
        <section className="py-12 sm:py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <HelpCircle className="h-8 w-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  Perguntas <span className="gradient-text">Frequentes</span>
                </h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Tire suas dúvidas sobre nosso processo e prazos
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faq.map((item: FAQ, index: number) => (
                  <AccordionItem
                    key={item.id}
                    value={`item-${item.id}`}
                    className="glass-card-hover rounded-xl border px-4 sm:px-6"
                  >
                    <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline py-4 sm:py-6">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-4 sm:pb-6">
                      <MarkdownText className="leading-normal space-y-1">{item.answer}</MarkdownText>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default Servicos;

