'use client';
import React, { createContext, useContext, ReactNode, useState } from "react";

// Define the translation keys for each language
interface Translations {
  home: string;
  products: string;
  about: string;
  contact: string;
  searchPlaceholder: string;
  noResults: string;
}

// Type for supported languages
type Language = "en" | "es" | "fr"; // Add your supported languages here

// The context will provide the current language and a method to change it
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Create and export the language context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations for each language
const translations: Record<Language, Translations> = {
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    searchPlaceholder: "Search...",
    noResults: "No results found",
  },
  es: {
    home: "Inicio",
    products: "Productos",
    about: "Acerca de",
    contact: "Contacto",
    searchPlaceholder: "Buscar...",
    noResults: "No se encontraron resultados",
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    about: "À propos",
    contact: "Contact",
    searchPlaceholder: "Chercher...",
    noResults: "Aucun résultat trouvé",
  },
};

// LanguageProvider component to provide the context
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en"); // Default language is "en"

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translate function to get the translated string for the current language
export const useTranslate = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslate must be used within a LanguageProvider");
  }
  const { language, setLanguage } = context;
  return { language, translate: (key: keyof Translations): string => translations[language][key] || key };
};
