import { Stack } from "expo-router";

export default function HabitsLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="add-habit" options={{presentation: 'modal'}} />
		</Stack>
	);
}
