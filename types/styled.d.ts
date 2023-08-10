import "styled-components/native";

declare module "styled-components/native" {
	export interface DefaultTheme {
		colors: {
			background: string;
			card: string;
			primary: string;
			secondary: string;
			tertiary: string;
			disabled: string;
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
	}
}

export interface ItemTabBarType {
	$isActive: boolean;
}
