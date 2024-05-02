import { Habit, HabitForm } from "@/src/types/habit";
import {
	Toast,
	ToastDescription,
	VStack,
	useToast,
} from "@gluestack-ui/themed";
import { NotificationFeedbackType, notificationAsync } from "expo-haptics";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite/next";
import { t } from "i18next";
import { toLower } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { createHabit, createHabitTable } from "../db/habits";

interface HabitContextType {
	habits: Habit[];
	addHabit: (newHabit: Habit, reset: UseFormReset<HabitForm>) => Promise<void>;
	deleteHabit: (habitId: string) => Promise<void>;
}

export const HabitContext = createContext<HabitContextType>({
	habits: [],
	addHabit: async () => {},
	deleteHabit: async () => {},
});

export const useHabit = () => {
	return useContext(HabitContext);
};

export const HabitProvider: React.FC<Props> = ({ children }) => {
	const toast = useToast();

	const [habits, setHabits] = useState<Habit[]>([]);
	const db = useSQLiteContext();

	useEffect(() => {
		createHabitTable(db);

		(async () => {
			const result = await db.getAllAsync("SELECT * FROM habits");
			setHabits(
				result.map((habit: any) => ({
					//@ts-ignore
					...habit,
					frequency: JSON.parse(habit.frequency),
					requiresGoal: habit.requiresGoal === 1,
					hasReminder: habit.hasReminder === 1,
				})),
			);
		})();
	}, []);

	const addHabit = async (newHabit: Habit, reset: UseFormReset<HabitForm>) => {
		const result = await createHabit(db, newHabit);

		if (result) {
			setHabits([...habits, newHabit]);
			reset();
			toast.show({
				placement: "bottom",
				render: ({ id }) => {
					notificationAsync(NotificationFeedbackType.Success);
					const toastId = `toast-${id}`;
					return (
						<TouchableOpacity onPress={() => toast.close(id)}>
							<Toast
								nativeID={toastId}
								action="success"
								variant="solid"
								rounded="$full"
							>
								<VStack space="xs">
									<ToastDescription>
										El habito {toLower(newHabit.name)} se anadio con exito
									</ToastDescription>
								</VStack>
							</Toast>
						</TouchableOpacity>
					);
				},
			});
		}
	};

	const deleteHabit = async (habitId: string) => {
		const result = await db.runAsync("DELETE FROM habits WHERE id = $id", {
			$id: habitId,
		});

		if (result) {
			router.back();
			const filterHabits = habits.filter((habit) => habit.id !== habitId);
			setHabits(filterHabits);

			toast.show({
				placement: "bottom",
				render: ({ id }) => {
					notificationAsync(NotificationFeedbackType.Success);
					const toastId = `toast-${id}`;
					return (
						<TouchableOpacity onPress={() => toast.close(id)}>
							<Toast
								nativeID={toastId}
								action="success"
								variant="solid"
								rounded="$full"
							>
								<VStack space="xs">
									<ToastDescription>
										{t('success.delete.habit')}
									</ToastDescription>
								</VStack>
							</Toast>
						</TouchableOpacity>
					);
				},
			});
		}
	};

	return (
		<HabitContext.Provider value={{ habits, addHabit, deleteHabit }}>
			{children}
		</HabitContext.Provider>
	);
};

interface Props {
	children: React.ReactNode;
}
