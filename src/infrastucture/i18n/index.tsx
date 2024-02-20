import i18n from "i18next";
import es from "./es.json";

// const languaje = getLocales()[0].languageCode;

const resources = {
	// de: {
	// 	translation: de,
	// },
	// en: {
	// 	translation: en,
	// },
	es: {
		translation: es,
	},
	// fr: {
	// 	translation: fr,
	// },
	// ja: {
	// 	translation: ja,
	// },
	// ko: {
	// 	translation: ko,
	// },
	// pt: {
	// 	translation: pt,
	// },
	// ru: {
	// 	translation: ru,
	// },
	// zh: {
	// 	translation: zh,
	// },
};

i18n.init({
	compatibilityJSON: "v3",
	interpolation: { escapeValue: false },
	resources,
	supportedLngs: ["es"],
	lng: "es",
	fallbackLng: "es",
	ns: ["translation"],
	defaultNS: "translation",
	debug: false,
});

export default i18n;
