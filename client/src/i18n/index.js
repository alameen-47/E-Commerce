// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "../locales/en/translation.json";
import translationAR from "../locales/ar/translation.json";
import translationBD from "../locales/bd/translation.json";
import translationFI from "../locales/fil/translation.json";
import translationIN from "../locales/in/translation.json";
import translationML from "../locales/ml/translation.json";
import translationUR from "../locales/ur/translation.json";

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
  bd: { translation: translationBD },
  fil: { translation: translationFI },
  in: { translation: translationIN },
  ml: { translation: translationML },
  ur: { translation: translationUR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
