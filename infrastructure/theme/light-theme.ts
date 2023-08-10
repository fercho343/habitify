import { DefaultTheme } from "styled-components/native";

const lightTheme: DefaultTheme = {
	colors: {
		background: "#101010",
		card: "#232323",
		text: "#FFFFFF",
		primary: "#82F042",
		secondary: "#B286FD",
		tertiary: "#E55733",
		disabled: "#5f5e5e",
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
		subtitle: 24,
		body: 14,
	},
};

export { lightTheme };
