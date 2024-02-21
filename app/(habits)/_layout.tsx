import { Stack } from "expo-router";

export default function HabitsLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="add-habit"
				options={{ animation: "fade_from_bottom" }}
			/>
		</Stack>
	);
}
