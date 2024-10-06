import i18 from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./resources";

const detection = {
	order: [
		"queryString",
		"cookie",
		"localStorage",
		"sessionStorage",
		"navigator",
	],
	caches: ["localStorage", "cookie"],
};

const localLanguage = localStorage.getItem("i18nextLng");
export function getLanguage() {
	if (localLanguage) {
		return localLanguage;
	}

	return "tr";
}

i18
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		detection,
		resources,
		fallbackLng: "tr",
		lng: getLanguage(),
		ns: ["product"],
		defaultNS: "product",
	});

export default i18;
