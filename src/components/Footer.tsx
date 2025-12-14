import { motion } from "framer-motion";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
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
                  src="/logos/logo-colorful.png"
                  alt="Toca Geek logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold gradient-text">
                  Toca Geek
                </h3>
                <p className="text-xs text-muted-foreground">
                  3D Printing Studio
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs">
              Transformando imaginação em realidade, uma camada de cada vez. Sua
              visão, nossa precisão.
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
              Serviços
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Colecionáveis & Figuras",
                "Props de Cosplay",
                "Peças de Engenharia",
                "Comunicação Visual",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
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
              <a
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                São Paulo, Brasil
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                contato@tocageek.com.br
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
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
            © {new Date().getFullYear()} Toca Geek. Todos os direitos
            reservados.
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
