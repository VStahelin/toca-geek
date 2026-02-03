import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ImageModal } from "@/components/ImageModal";
import { useGaleria } from "@/hooks/useGaleria";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { GaleriaProject } from "@/lib/api/types";

const Projetos = () => {
  const { data: projetos, isLoading, error } = useGaleria();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalProject, setModalProject] = useState<GaleriaProject | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extrai categorias únicas
  const categories = useMemo(() => {
    if (!projetos) return [];
    const uniqueCategories = Array.from(
      new Set(projetos.map((p: GaleriaProject) => p.category))
    );
    return uniqueCategories;
  }, [projetos]);

  // Separa projetos em destaque e normais
  const { highlightedProjects, regularProjects } = useMemo(() => {
    if (!projetos) return { highlightedProjects: [], regularProjects: [] };

    let filtered = projetos;

    // Filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter(
        (p: GaleriaProject) => p.category === selectedCategory
      );
    }

    // Separa em destacados e normais
    const highlighted = filtered.filter(
      (p: GaleriaProject) => p.is_highlighted
    );
    const regular = filtered.filter((p: GaleriaProject) => !p.is_highlighted);

    return { highlightedProjects: highlighted, regularProjects: regular };
  }, [projetos, selectedCategory]);

  // Projetos filtrados (todos juntos para contagem)
  const filteredProjects = useMemo(() => {
    return [...highlightedProjects, ...regularProjects];
  }, [highlightedProjects, regularProjects]);

  // Abre modal se houver parâmetro na URL
  useEffect(() => {
    if (!projetos || isLoading) return;

    const projectId = searchParams.get("project");
    if (projectId) {
      const project = projetos.find(
        (p: GaleriaProject) => p.id === parseInt(projectId)
      );
      if (project) {
        setModalProject(project);
        setModalImageIndex(0);
        setIsModalOpen(true);
        // Remove o parâmetro da URL após abrir
        setSearchParams({}, { replace: true });
      }
    }
  }, [projetos, isLoading, searchParams, setSearchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalProject(null);
  };

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
            Erro ao carregar projetos. Tente novamente mais tarde.
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!projetos || projetos.length === 0) {
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

      {/* Hero Section compacto */}
      <section className="relative py-6 sm:py-8 md:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 sm:mb-6 pt-6 sm:pt-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Nossos <span className="gradient-text">Projetos</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Lista de projetos realizados. Cada peça é única e feita com paixão.
            </p>
          </motion.div>

          {/* Filtros por Categoria */}
          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6"
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

      {/* Seção de Projetos em Destaque */}
      {highlightedProjects.length > 0 && (
        <section className="py-4 sm:py-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-0.5 w-8 bg-gradient-primary rounded-full" />
                <h2 className="text-lg sm:text-xl font-bold">
                  Projetos em <span className="gradient-text">Destaque</span>
                </h2>
                <div className="h-0.5 flex-1 bg-gradient-primary rounded-full" />
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Nossos trabalhos mais especiais
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {highlightedProjects.map(
                (project: GaleriaProject, index: number) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Badge de destaque no card */}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-gradient-primary text-primary-foreground shadow-lg">
                        ⭐ Destaque
                      </Badge>
                    </div>
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Grid de Projetos */}
      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Título da seção de todos os projetos (só aparece se houver destaques) */}
          {highlightedProjects.length > 0 && regularProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-0.5 w-8 bg-gradient-primary rounded-full" />
                <h2 className="text-lg sm:text-xl font-bold">
                  Todos os <span className="gradient-text">Projetos</span>
                </h2>
                <div className="h-0.5 flex-1 bg-gradient-primary rounded-full" />
              </div>
            </motion.div>
          )}

          {filteredProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm mb-2">
                Nenhum projeto encontrado nesta categoria.
              </p>
              {selectedCategory && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4"
                >
                  Limpar filtro
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Se houver filtro de categoria, mostra todos juntos (destaques + regulares) */}
              {selectedCategory
                ? filteredProjects.map(
                    (project: GaleriaProject, index: number) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                      />
                    )
                  )
                : // Se não houver filtro, mostra apenas os regulares (destaques já foram mostrados acima)
                  regularProjects.map(
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
        </div>
      </section>

      <Footer />

      {/* Modal de visualização de imagens (quando aberto via URL) */}
      {modalProject && (
        <ImageModal
          project={modalProject}
          initialImageIndex={modalImageIndex}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default Projetos;
