import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Início", href: "/" },
  { name: "Serviços", href: "/#services" },
  { name: "Galeria", href: "/galeria" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-10 h-10 rounded-xl overflow-hidden"
          >
            <img
              src="/logos/logo-colorful.png"
              alt="Toca Geek logo"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <span className="text-lg sm:text-xl font-bold gradient-text hidden xs:block">
            Toca Geek
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || 
              (link.href === "/#services" && location.pathname === "/");
            
            return (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                onClick={(e) => {
                  // Se for link com hash, permite scroll suave
                  if (link.href.includes("#")) {
                    e.preventDefault();
                    if (location.pathname !== "/") {
                      // Se não estiver na home, navega primeiro
                      window.location.href = link.href;
                    } else {
                      // Se já estiver na home, faz scroll suave
                      const element = document.querySelector(link.href.replace("/", ""));
                      element?.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button size="sm">Entrar em Contato</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-card mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      // Se for link com hash, permite scroll suave
                      if (link.href.includes("#")) {
                        e.preventDefault();
                        if (location.pathname !== "/") {
                          window.location.href = link.href;
                        } else {
                          const element = document.querySelector(link.href.replace("/", ""));
                          element?.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className="block text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Button className="w-full mt-3 sm:mt-4 text-sm sm:text-base">
                Entrar em Contato
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
