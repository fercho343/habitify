import { HabitProvider } from "@/src/services/context/habit.context";
import { Stack } from "expo-router";

export default function HabitsLayout() {
	return (
		<HabitProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen
					name="add-habit"
					options={{ animation: "fade_from_bottom" }}
				/>
				<Stack.Screen name="[id]" options={{ presentation: "formSheet" }} />
			</Stack>
		</HabitProvider>
	);
}
