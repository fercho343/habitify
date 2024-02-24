import {
	Toast,
	ToastDescription,
	ToastTitle,
	VStack,
	useToast,
} from "@gluestack-ui/themed";
import { useAppState } from "@react-native-community/hooks";
import Constants from "expo-constants";
import * as Device from "expo-device";
import {
	Notification,
	Subscription,
	addNotificationReceivedListener,
	getExpoPushTokenAsync,
	getPermissionsAsync,
	requestPermissionsAsync,
	scheduleNotificationAsync,
	setNotificationHandler,
} from "expo-notifications";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";

interface ContextType {
	schedulePushNotification: () => Promise<void>;
}
export const NotificationContext = createContext<ContextType>({
	schedulePushNotification: async () => {},
});

export const useNotification = () => {
	return useContext(NotificationContext);
};

export const NotificationProvider: React.FC<Props> = ({ children }) => {
	const currentAppState = useAppState();
	const toast = useToast();

	const [notification, setNotification] = useState<Notification>();
	const notificationListener = useRef<Subscription>();

	useEffect(() => {
		(async () => {
			await registerForPushNotificationsAsync();
		})();

		notificationListener.current = addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			},
		);
	}, []);

	const [showNotification, setShowNotification] = useState<boolean>(false);
	setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: showNotification,
			shouldPlaySound: true,
			shouldSetBadge: false,
		}),
	});

	useEffect(() => {
		if (currentAppState === "active") {
			setShowNotification(false);
		} else {
			setShowNotification(true);
		}
	}, [currentAppState]);

	useEffect(() => {
		if (notification) {
			toast.show({
				placement: "top",
				render: ({ id }) => {
					const toastId = `toast-${id}`;
					return (
						<TouchableOpacity onPress={() => toast.close(id)}>
							<Toast nativeID={toastId} action="info" variant="solid">
								<VStack w="100%">
									<ToastTitle>{notification.request.content.title}</ToastTitle>
									<ToastDescription>
										{notification.request.content.body}
									</ToastDescription>
								</VStack>
							</Toast>
						</TouchableOpacity>
					);
				},
			});
		}
	}, [notification]);

	async function schedulePushNotification() {
		await scheduleNotificationAsync({
			content: {
				title: "You've got mail! ��",
				body: "Here is the notification body",
				sound: "default",
			},
			trigger: {
				seconds: 3,
				repeats: false,
			},
		});
	}

	return (
		<NotificationContext.Provider
			value={{
				schedulePushNotification,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

interface Props {
	children: React.ReactNode;
}

async function registerForPushNotificationsAsync() {
	let token: string;

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

		token = (
			await getExpoPushTokenAsync({
				projectId: Constants?.expoConfig?.extra?.eas.projectId,
			})
		).data;
	} else {
		alert("Must use physical device for Push Notifications");
	}

	//@ts-ignore
	return token;
}
