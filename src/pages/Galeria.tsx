import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { useGaleria } from "@/hooks/useGaleria";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { GaleriaProject } from "@/lib/api/types";

const Galeria = () => {
  const { data: galeria, isLoading, error } = useGaleria();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extrai categorias únicas
  const categories = useMemo(() => {
    if (!galeria) return [];
    const uniqueCategories = Array.from(
      new Set(galeria.map((p: GaleriaProject) => p.category))
    );
    return uniqueCategories;
  }, [galeria]);

  // Filtra projetos por categoria
  const filteredProjects = useMemo(() => {
    if (!galeria) return [];
    if (!selectedCategory) return galeria;
    return galeria.filter(
      (p: GaleriaProject) => p.category === selectedCategory
    );
  }, [galeria, selectedCategory]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-destructive text-lg">
            Erro ao carregar galeria. Tente novamente mais tarde.
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!galeria || galeria.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 pt-8 sm:pt-12 md:pt-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Nossos <span className="gradient-text">Projetos</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore nossa galeria completa de projetos realizados. Cada peça é
              única e feita com paixão.
            </p>
          </motion.div>

          {/* Filtros por Categoria */}
          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                Todos
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Grid de Projetos */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum projeto encontrado nesta categoria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
              {filteredProjects.map(
                (project: GaleriaProject, index: number) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                )
              )}
            </div>
          )}

          {/* Contador */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">
              Mostrando {filteredProjects.length} de {galeria.length} projetos
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Galeria;
