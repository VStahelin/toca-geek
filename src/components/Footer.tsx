import { motion } from "framer-motion";
import {
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFooter } from "@/hooks/useFooter";
import { Skeleton } from "@/components/ui/skeleton";

// Mapeamento de ícones para redes sociais
const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
  email: Mail,
};

const Footer = () => {
  const { data: footerData, isLoading, error } = useFooter();

  // Se estiver carregando, mostra skeleton
  if (isLoading) {
    return (
      <footer className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-border overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  // Se houver erro, mostra footer básico
  if (error || !footerData) {
    return (
      <footer className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-border overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="container mx-auto relative z-10 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Toca Geek. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    );
  }

  // Monta links de redes sociais dinamicamente (só renderiza se tiver link válido)
  const socialLinks = [
    footerData.social.instagram &&
      footerData.social.instagram.trim() !== "" && {
        icon: socialIcons.instagram,
        href: footerData.social.instagram,
        label: "Instagram",
      },
    footerData.social.facebook &&
      footerData.social.facebook.trim() !== "" && {
        icon: socialIcons.facebook,
        href: footerData.social.facebook,
        label: "Facebook",
      },
    footerData.social.youtube &&
      footerData.social.youtube.trim() !== "" && {
        icon: socialIcons.youtube,
        href: footerData.social.youtube,
        label: "YouTube",
      },
    footerData.social.linkedin &&
      footerData.social.linkedin.trim() !== "" && {
        icon: socialIcons.linkedin,
        href: footerData.social.linkedin,
        label: "LinkedIn",
      },
    footerData.social.whatsapp &&
      footerData.social.whatsapp.trim() !== "" && {
        icon: socialIcons.whatsapp,
        href: footerData.social.whatsapp.startsWith("http")
          ? footerData.social.whatsapp
          : `https://wa.me/${footerData.social.whatsapp.replace(/\D/g, "")}`,
        label: "WhatsApp",
      },
    footerData.contact.email &&
      footerData.contact.email.trim() !== "" && {
        icon: socialIcons.email,
        href: `mailto:${footerData.contact.email}`,
        label: "Email",
      },
  ].filter(Boolean) as Array<{
    icon: typeof Instagram;
    href: string;
    label: string;
  }>;

  // Formata endereço completo (só se habilitado)
  const fullAddress = footerData.address.enable
    ? `${footerData.address.street}, ${footerData.address.neighborhood}, ${footerData.address.city} - ${footerData.address.state}, ${footerData.address.zipCode}`
    : "";
  return (
    <footer className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-border overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo / Mascot */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden">
                <img
                  src={footerData.company.logo}
                  alt={`${footerData.company.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold gradient-text">
                  {footerData.company.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  3D Printing Studio
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs">
              {footerData.company.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  Início
                </Link>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  Serviços
                </a>
              </li>
              <li>
                <Link
                  to="/galeria"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  Galeria
                </Link>
              </li>
            </ul>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4 mt-6">
              Legal
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/privacidade"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/termos"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
              Contato
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {footerData.address.enable && footerData.address.city && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    fullAddress
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="line-clamp-2">
                    {footerData.address.city}, {footerData.address.state}
                  </span>
                </a>
              )}
              {footerData.contact.email && (
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                  {footerData.contact.email}
                </a>
              )}
              {footerData.contact.phone && (
                <a
                  href={`tel:${footerData.contact.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {footerData.contact.phone}
                </a>
              )}
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={
                        social.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        social.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-card-hover flex items-center justify-center group"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} {footerData.company.name}. Todos os
            direitos reservados.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
            Feito com <span className="text-primary">♥</span> e muito filamento
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
