"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { kk } from "../locales/kk";
import { ru } from "../locales/ru";

type LocaleType = "kk" | "ru";
type Translations = typeof kk;

interface I18nContextType {
  locale: LocaleType;
  t: Translations;
  setLocale: (locale: LocaleType) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<LocaleType>("kk");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as LocaleType;
    if (saved && (saved === "kk" || saved === "ru")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: LocaleType) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = locale === "kk" ? kk : ru;

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
