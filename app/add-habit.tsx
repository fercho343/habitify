import { FormAddHabit } from "@/features/addHabit/FormAddHabit";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function AddHabitScreen() {
	return (
		<BottomSheetModalProvider>
			<FormAddHabit />
		</BottomSheetModalProvider>
	);
}
