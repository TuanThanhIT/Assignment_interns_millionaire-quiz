import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import vi from "./vi";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  lng: "vi", // ngôn ngữ mặc định
  fallbackLng: "en", // nếu thiếu key trong "vi" thì dùng "en"
  interpolation: {
    escapeValue: false, // tránh việc escape HTML (nên để false trong React)
  },
});

export default i18n;
