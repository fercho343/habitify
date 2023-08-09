import "styled-components/native";

declare module "styled-components/native" {
	export interface DefaultTheme {
		colors: {
			background: string;
			card: string;
			primary: string;
			secondary: string;
			tertiary: string;
		};
	}
}

export interface ItemTabBarType {
	$isActive: boolean;
}
