import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Menu, X, Shield, Globe } from "lucide-react";
import { useState } from "react";
import { Language } from "@shared/schema";

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Helper to construct localized paths
  const p = (path: string) => `/${language}${path}`;

  const navItems = [
    { label: "Mission", path: "/mission" },
    { label: "Aree", path: "/areas" },
    { label: "Eventi", path: "/events" },
    { label: "Formazione", path: "/courses" },
    { label: "Progetti", path: "/projects" },
    { label: "Servizi", path: "/services" },
    { label: "Blog", path: "/blog" },
  ];

  const languages: Language[] = ["it", "en", "de", "fr"];

  return (
    <header className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href={`/${language}`} className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center transition-transform group-hover:rotate-12">
              <Shield className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <span className="text-xl font-bold tracking-tight uppercase">Pro IA</span>
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
              Contatti
            </Link>

            {/* Language Switcher */}
            <div className="relative group ml-4 pl-4 border-l border-border h-6 flex items-center">
              <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary">
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
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-4 shadow-xl animate-in slide-in-from-top-5">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={p(item.path)}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium uppercase tracking-wider hover:text-primary transition-colors",
                  location.includes(item.path) ? "text-primary" : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href={p("/contact")}
              onClick={() => setIsOpen(false)}
              className="inline-block w-full text-center px-5 py-3 bg-foreground text-background font-semibold uppercase tracking-wide"
            >
              Contattaci
            </Link>
            
            <div className="flex space-x-4 pt-4 border-t border-border justify-center">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setIsOpen(false); }}
                  className={cn(
                    "text-sm font-bold uppercase p-2",
                    language === lang ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
