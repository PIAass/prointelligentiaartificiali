import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from "wouter";
import { Language } from "@shared/schema";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>("it");

  // Sync language with URL
  useEffect(() => {
    const pathParts = location.split('/');
    // pathParts[0] is empty string if path starts with /
    const langSegment = pathParts[1]; 
    
    if (langSegment && ["it", "en", "de", "fr"].includes(langSegment)) {
      setLanguageState(langSegment as Language);
    } else if (location === "/") {
       // Redirect root to default language
       setLocation("/it");
    }
  }, [location, setLocation]);

  const setLanguage = (newLang: Language) => {
    const pathParts = location.split('/');
    // Replace the language segment
    pathParts[1] = newLang;
    const newPath = pathParts.join('/') || `/${newLang}`;
    setLocation(newPath);
    setLanguageState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
