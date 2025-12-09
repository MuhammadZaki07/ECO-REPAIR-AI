import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_landing_page from "./locales/en/en_landing_page.json";
import id_landing_page from "./locales/id/id_landing_page.json";
import en_auth from "./locales/en/en_auth.json";
import id_auth from "./locales/id/id_auth.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en_landing_page,
      auth: en_auth,
    },
    id: {
      translation: id_landing_page,
      auth: id_auth,
    },
  },
  lng: "en",
  fallbackLng: "en",
  ns: ["translation", "auth"], 
  defaultNS: "translation",
  interpolation: { escapeValue: false },
});

export default i18n;
