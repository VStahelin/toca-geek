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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-xl border bg-card glass-card-hover"
    >
      {/* Carrossel de Imagens */}
      <div className="relative overflow-hidden">
        <ProjectImageCarousel project={project} />
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3">
        {/* Cabeçalho */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold mb-1 group-hover:gradient-text transition-colors line-clamp-2">
                {project.title}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
            </div>
            {/* Badge de destaque removido daqui - agora é exibido na seção de destaques */}
          </div>

          {/* Descrição */}
          <p className="text-muted-foreground text-sm leading-snug line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tags, Data e Instagram */}
        <div className="flex flex-col gap-2 pt-3 border-t">
          {/* Primeira linha: Data e Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(project.date).toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
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
                  "group flex items-center gap-1.5 text-xs text-muted-foreground",
                  "hover:text-primary transition-colors duration-200",
                  "underline-offset-4 hover:underline"
                )}
              >
                <Instagram className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                <span>Ver no Instagram</span>
                <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ring-2 ring-primary/20 pointer-events-none" />
    </motion.article>
  );
};
