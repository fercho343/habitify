import { DefaultTheme } from "styled-components/native";

const lightTheme: DefaultTheme = {
	colors: {
		background: "#0e0e0e",
		card: "#191919",
		box: "#2e2e2e",
		text: "#FFFFFF",
		primary: "#82F042",
		secondary: "#B286FD",
		tertiary: "#E55733",
		disabled: "#5f5e5e",
		error: "#f44336",
		info: "#29b6f6",
	},
	fonts: {
		MacPaw: "MacPaw",
		MacPawExtraLight: "MacPawExtraLight",
		MacPawThing: "MacPawThing",
		MacPawLight: "MacPawLight",
		MacPawMedium: "MacPawMedium",
		MacPawSemiBold: "MacPawSemiBold",
		MacPawBold: "MacPawBold",
		MacPawExtraBold: "MacPawExtraBold",
	},
	fontSize: {
		headlineLarge: 48,
		headlineMedium: 32,
		subtitle: 18,
		body: 14,
	},
};

export { lightTheme };
