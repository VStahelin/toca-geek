import { motion } from "framer-motion";
import { Calendar, Tag, Instagram, ExternalLink } from "lucide-react";
import { ProjectImageCarousel } from "./ProjectImageCarousel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { GaleriaProject } from "@/lib/api/types";

interface ProjectCardProps {
  project: GaleriaProject;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border bg-card glass-card-hover"
    >
      {/* Carrossel de Imagens */}
      <div className="relative overflow-hidden">
        <ProjectImageCarousel project={project} />
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-4">
        {/* Cabeçalho */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-colors">
                {project.title}
              </h3>
              <Badge variant="secondary" className="mb-2">
                {project.category}
              </Badge>
            </div>
            {project.is_highlighted && (
              <Badge variant="default" className="shrink-0">
                Destaque
              </Badge>
            )}
          </div>

          {/* Descrição */}
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags, Data e Instagram */}
        <div className="flex flex-col gap-3 pt-4 border-t">
          {/* Primeira linha: Data e Tags */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(project.date).toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Segunda linha: Instagram Link (se existir) */}
          {project.instagram_url && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center"
            >
              <a
                href={project.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-2 text-sm text-muted-foreground",
                  "hover:text-primary transition-colors duration-200",
                  "underline-offset-4 hover:underline"
                )}
              >
                <Instagram className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Ver post no Instagram</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ring-2 ring-primary/20 pointer-events-none" />
    </motion.article>
  );
};
