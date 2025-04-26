// context/LanguageContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@app_language_preference";

export const LanguageContext = createContext({
  language: "english",
  setLanguage: (_lang) => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("english");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === "english" || saved === "arabic") {
        setLanguageState(saved);
      }
    });
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    AsyncStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
