import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Language } from "@shared/schema";
import logoImage from "@assets/logo_castagna_tech_PIA_1766794794162.png";

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const p = (path: string) => `/${language}${path}`;

  const navItems = [
    { label: t.nav.mission, path: "/mission" },
    { label: t.nav.areas, path: "/areas" },
    { label: t.nav.events, path: "/events" },
    { label: t.nav.courses, path: "/courses" },
    { label: t.nav.services, path: "/services" },
  ];

  const languages: Language[] = ["it", "en", "de", "fr"];

  return (
    <header className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href={`/${language}`} className="flex items-center space-x-3 group cursor-pointer">
            <img 
              src={logoImage} 
              alt="PIA Logo" 
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight uppercase">PIA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={p(item.path)}
                className={cn(
                  "text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors",
                  location.includes(item.path) ? "text-primary font-bold" : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            <Link 
              href={p("/contact")}
              className="px-5 py-2.5 bg-foreground text-background text-sm font-semibold uppercase tracking-wide hover:bg-primary transition-colors"
            >
              {t.nav.contact}
            </Link>

            {/* Language Switcher */}
            <div className="relative group ml-4 pl-4 border-l border-border h-6 flex items-center">
              <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary" data-testid="button-language-switcher">
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-24 bg-background border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "px-4 py-2 text-left text-sm uppercase hover:bg-muted transition-colors",
                      language === lang ? "font-bold text-primary" : ""
                    )}
                    data-testid={`button-lang-${lang}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={p(item.path)}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-muted transition-colors",
                  location.includes(item.path) ? "text-primary font-bold" : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={p("/contact")}
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-muted transition-colors"
            >
              {t.nav.contact}
            </Link>
            
            {/* Mobile Language Switcher */}
            <div className="px-6 py-3 border-t border-border mt-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground uppercase">Lingua:</span>
              </div>
              <div className="flex gap-2 mt-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "px-3 py-1 text-sm uppercase border rounded",
                      language === lang 
                        ? "border-primary text-primary font-bold" 
                        : "border-border text-muted-foreground hover:border-primary"
                    )}
                    data-testid={`button-mobile-lang-${lang}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
