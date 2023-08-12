import { TabBar } from "@/components/TabBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Device from "expo-device";
import {
	AndroidImportance,
	Subscription,
	addNotificationReceivedListener,
	addNotificationResponseReceivedListener,
	getExpoPushTokenAsync,
	getPermissionsAsync,
	removeNotificationSubscription,
	requestPermissionsAsync,
	setNotificationChannelAsync,
	setNotificationHandler,
} from "expo-notifications";
import { Tabs } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
	const notificationListener = useRef<Subscription>();
	const responseListener = useRef<Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token),
		);

		notificationListener.current = addNotificationReceivedListener(
			(notification) => {},
		);

		responseListener.current = addNotificationResponseReceivedListener(
			(response) => {},
		);

		return () => {
			if (notificationListener.current) {
				removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	return (
		<BottomSheetModalProvider>
			<Tabs
				//@ts-ignore
				tabBar={(props) => <TabBar {...props} />}
				screenOptions={{
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
					}}
				/>

				<Tabs.Screen
					name="progress"
					options={{
						title: "Progress",
					}}
				/>

				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
					}}
				/>
			</Tabs>
		</BottomSheetModalProvider>
	);
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Device.isDevice) {
		const { status: existingStatus } = await getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}

		token = (await getExpoPushTokenAsync()).data;
	} else {
	}

	if (Platform.OS === "android") {
		await setNotificationChannelAsync("habits", {
			name: "default",
			showBadge: true,
			importance: AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FE9018",
		});
	}
	return token;
}
