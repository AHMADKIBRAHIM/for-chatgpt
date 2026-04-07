import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      today: "Today",
      habits: "Habits",
      analytics: "Analytics",
      settings: "Settings"
    }
  },
  ar: {
    translation: {
      today: "اليوم",
      habits: "العادات",
      analytics: "التحليلات",
      settings: "الإعدادات"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
