import { config } from "@/config";
import i18n from "@/src/infrastucture/i18n";
import { HabitProvider } from "@/src/services/context/habit.context";
import { NotificationProvider } from "@/src/services/context/notification.context";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite/next";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(habits)",
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
		Nabla: require("@/assets/fonts/Nabla-Regular.ttf"),
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
		<I18nextProvider i18n={i18n}>
			<GluestackUIProvider config={config} colorMode="dark">
				<SQLiteProvider databaseName="habitDevelop.db">
					<NotificationProvider>
						<HabitProvider>
							<GestureHandlerRootView style={{ flex: 1 }}>
								<Tabs
									screenOptions={{
										headerShown: false,
										tabBarStyle: { display: "none" },
									}}
								>
									<Tabs.Screen name="(habits)" />
									<Tabs.Screen name="(progress)" />
									<Tabs.Screen name="(profile)" />
								</Tabs>
							</GestureHandlerRootView>
						</HabitProvider>
					</NotificationProvider>
				</SQLiteProvider>
			</GluestackUIProvider>
		</I18nextProvider>
	);
}
