import { initReactI18next } from "gatsby-plugin-react-i18next";
import i18n from "i18next";
import "prismjs/themes/prism-solarizedlight.css";
import translationZH from "./locales/cn/index.json";
import translationEN from "./locales/en/index.json";
import "./src/styles/custom.css";
import "./src/styles/global.css";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    zh: {
      translation: translationZH,
    },
  },
  lng: "en", // 设置默认语言为英文
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});
