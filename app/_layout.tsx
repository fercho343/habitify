import i18n from "@/constants/i18n";
import { lightTheme } from "@/constants/theme/light-theme";
import { ProfileProvider } from "@/services/context/ProfileContext";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { t } from "i18next";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
		MacPawExtraLight: require("@/assets/fonts/MacPaw/MacPaw-ExtraLight.ttf"),
		MacPawThing: require("@/assets/fonts/MacPaw/MacPaw-Thin.ttf"),
		MacPawLight: require("@/assets/fonts/MacPaw/MacPaw-Light.ttf"),
		MacPawMedium: require("@/assets/fonts/MacPaw/MacPaw-Medium.ttf"),
		MacPaw: require("@/assets/fonts/MacPaw/MacPaw-Regular.ttf"),
		MacPawSemiBold: require("@/assets/fonts/MacPaw/MacPaw-SemiBold.ttf"),
		MacPawBold: require("@/assets/fonts/MacPaw/MacPaw-Bold.ttf"),
		MacPawExtraBold: require("@/assets/fonts/MacPaw/MacPaw-ExtraBold.ttf"),
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

	return (
		<ThemeProvider theme={lightTheme}>
			<I18nextProvider i18n={i18n}>
				<RootLayoutNav />
			</I18nextProvider>
		</ThemeProvider>
	);
}

function RootLayoutNav() {
	return (
		<ProfileProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="add-habit"
						options={{
							presentation: "modal",
							title: t("add-habit"),
							headerStyle: {
								backgroundColor: lightTheme.colors.background,
							},
							headerTitleStyle: {
								color: lightTheme.colors.text,
								fontFamily: lightTheme.fonts.MacPaw,
							},
							headerLeft: () => (
								<TouchableOpacity onPress={() => router.back()}>
									<AntDesign name="down" size={25} color="#fff" />
								</TouchableOpacity>
							),
						}}
					/>
				</Stack>
			</GestureHandlerRootView>
		</ProfileProvider>
	);
}
