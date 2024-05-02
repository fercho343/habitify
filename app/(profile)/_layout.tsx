import { Stack } from "expo-router";

export default function ProfileLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="journal" />
			<Stack.Screen name="schedules" />
			<Stack.Screen
				name="information"
				options={{ presentation: "formSheet" }}
			/>
			<Stack.Screen name="donations" options={{ presentation: "formSheet" }} />
		</Stack>
	);
}
