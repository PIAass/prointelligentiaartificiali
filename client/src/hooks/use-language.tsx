import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from "wouter";
import { Language } from "@shared/schema";

const LANGUAGE_STORAGE_KEY = "pia-language";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getStoredLanguage(): Language | null {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && ["it", "en", "de", "fr"].includes(stored)) {
      return stored as Language;
    }
  } catch {
    // localStorage not available
  }
  return null;
}

function storeLanguage(lang: Language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // localStorage not available
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>("it");

  // Sync language with URL and localStorage
  useEffect(() => {
    const pathParts = location.split('/');
    const langSegment = pathParts[1]; 
    
    if (langSegment && ["it", "en", "de", "fr"].includes(langSegment)) {
      setLanguageState(langSegment as Language);
      storeLanguage(langSegment as Language);
    } else if (location === "/") {
      // Check localStorage for preferred language
      const storedLang = getStoredLanguage();
      const preferredLang = storedLang || "it";
      setLocation(`/${preferredLang}`);
    }
  }, [location, setLocation]);

  const setLanguage = (newLang: Language) => {
    const pathParts = location.split('/');
    // Replace the language segment
    pathParts[1] = newLang;
    const newPath = pathParts.join('/') || `/${newLang}`;
    setLocation(newPath);
    setLanguageState(newLang);
    storeLanguage(newLang);
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
