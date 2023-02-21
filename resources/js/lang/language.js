import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      // Engilsh Language 
      en: {
        translations: {
          "Welcome to React": "Welcome to React",
          "Hello World": "Hello World",
        }
      },

      // Myanmar Language 
      mm: {
        translations: {
          "Hello World": "ဟဲလို ကမ္ဘာကြီး",
          "Welcome to React": "Welcome to React in myanmar",
        }
      }


    },
    fallbackLng: "en",
    debug: true,

  
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;