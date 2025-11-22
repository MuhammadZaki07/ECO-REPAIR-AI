import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_landing_page from "./locales/en/en_landing_page.json";
import id_landing_page from "./locales/id/id_landing_page.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en_landing_page },
    id: { translation: id_landing_page },
  },
  lng: "id",
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
