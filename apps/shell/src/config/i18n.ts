import i18 from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import tr from "./locale/tr.json";
import en from "./locale/en.json";

const resources = {
	tr: {
		shell: tr,
	},
	en: {
		shell: en,
	},
};

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
		ns: ["shell"],
		defaultNS: "shell",
	});

export default i18;
