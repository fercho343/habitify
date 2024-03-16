import { HabitDetails } from "@/src/features/home/habit-details";
import { SafeAreaView } from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";

export default function IdHabit() {
	const params = useLocalSearchParams();
	console.log(params);

	return (
		<SafeAreaView flex={1} backgroundColor="$background">
			<HabitDetails />
		</SafeAreaView>
	);
}
