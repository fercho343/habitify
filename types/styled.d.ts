import "styled-components/native";

declare module "styled-components/native" {
	export interface DefaultTheme {
		colors: {
			background: string;
			card: string;
			text: string;
			primary: string;
			secondary: string;
			tertiary: string;
			disabled: string;
			error: string;
		};
		fonts: {
			MacPaw: string;
			MacPawExtraLight: string;
			MacPawThing: string;
			MacPawLight: string;
			MacPawMedium: string;
			MacPawSemiBold: string;
			MacPawBold: string;
			MacPawExtraBold: string;
		};
		fontSize: {
			headlineLarge: number;
			headlineMedium: number;
			subtitle: number;
			body: number;
		};
	}
}

export interface ItemTabBarType {
	$isActive: boolean;
}
