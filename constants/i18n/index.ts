import { getLocales } from "expo-localization";
import i18n from "i18next";
import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import ja from "./ja.json";
import ko from "./ko.json";
import pt from "./pt.json";
import ru from "./ru.json";
import zh from "./zh.json";

const languaje = getLocales()[0].languageCode;

const resources = {
	de: {
		translation: de,
	},
	en: {
		translation: en,
	},
	es: {
		translation: es,
	},
	fr: {
		translation: fr,
	},
	ja: {
		translation: ja,
	},
	ko: {
		translation: ko,
	},
	pt: {
		translation: pt,
	},
	ru: {
		translation: ru,
	},
	zh: {
		translation: zh,
	},
};

i18n.init({
	compatibilityJSON: "v3",
	interpolation: { escapeValue: false },
	resources,
	supportedLngs: ["de", "en", "es", "fr", "ja", "ko", "pt", "ru", "zh"],
	lng: languaje,
	fallbackLng: "en",
	ns: ["translation"],
	defaultNS: "translation",
	debug: false,
});

export default i18n;
