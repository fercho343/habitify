import { HabitDetails } from "@/src/features/home/habit-details";
import { SafeAreaView } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";

export default function IdHabit() {
	const { habit } = useLocalSearchParams();
	//@ts-ignore
	const habitData = JSON.parse(habit);

	return (
		<SafeAreaView flex={1} backgroundColor="$background">
			<HabitDetails habit={habitData} />
		</SafeAreaView>
	);
}
