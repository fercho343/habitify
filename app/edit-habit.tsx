import { FormEditHabit } from "@/features/editHabit/FormEditHabit";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";

export default function EditHabitScreen() {
	const { habit } = useLocalSearchParams();
	const formatHabit = JSON.parse(habit.toString());

	return (
		<BottomSheetModalProvider>
			<FormEditHabit habit={formatHabit} />
		</BottomSheetModalProvider>
	);
}
