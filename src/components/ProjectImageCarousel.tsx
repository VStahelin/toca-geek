import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { GaleriaImage, GaleriaProject } from "@/lib/api/types";

interface ProjectImageCarouselProps {
  project: GaleriaProject;
}

export const ProjectImageCarousel = ({
  project,
}: ProjectImageCarouselProps) => {
  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {project.images.map((image: GaleriaImage, index: number) => (
            <CarouselItem key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-video w-full overflow-hidden rounded-t-2xl"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {project.images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 md:left-4" />
            <CarouselNext className="right-2 md:right-4" />
          </>
        )}
      </Carousel>
    </div>
  );
};
