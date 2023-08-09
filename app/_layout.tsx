import { lightTheme } from "@/infrastructure/theme/light-theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		MacPawExtraLight: require("../assets/fonts/MacPaw/MacPaw-ExtraLight.ttf"),
		MacPawThing: require("../assets/fonts/MacPaw/MacPaw-Thin.ttf"),
		MacPawLight: require("../assets/fonts/MacPaw/MacPaw-Light.ttf"),
		MacPawMedium: require("../assets/fonts/MacPaw/MacPaw-Medium.ttf"),
		MacPaw: require("../assets/fonts/MacPaw/MacPaw-Regular.ttf"),
		MacPawSemiBold: require("../assets/fonts/MacPaw/MacPaw-SemiBold.ttf"),
		MacPawBold: require("../assets/fonts/MacPaw/MacPaw-Bold.ttf"),
		MacPawExtraBold: require("../assets/fonts/MacPaw/MacPaw-ExtraBold.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<>
			<ThemeProvider theme={lightTheme}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>
			<StatusBar style="light" />
		</>
	);
}
