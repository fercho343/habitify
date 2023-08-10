import i18n from "i18next";
import es from "./es.json";

const resources = {
	es: {
		translation: es,
	}, 
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
