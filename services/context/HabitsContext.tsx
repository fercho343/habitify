import { Habit, HabitCompletion } from "@/types/habits";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Assuming you're using React Navigation
import { randomUUID } from "expo-crypto";
import { scheduleNotificationAsync } from "expo-notifications";
import { t } from "i18next";
import moment from "moment";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface HabitContextType {
	habits: Habit[];
	setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
	saveHabit: (habit: Habit) => void;
	removeHabit: (id: string) => void;
	completedHabits: HabitCompletion[];
	completeHabit: (id: string) => void;
}

export const HabitContext = createContext<HabitContextType>({
	habits: [],
	setHabits: () => {},
	saveHabit: (habit: Habit) => {},
	removeHabit: (id: string) => {},
	completedHabits: [],
	completeHabit: (id: string) => {},
});

interface HabitProviderProps {
	children: ReactNode;
}

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [completedHabits, setCompletedHabits] = useState<HabitCompletion[]>([]);
	const navigation = useNavigation(); // Hook from React Navigation

	useEffect(() => {
		(async () => {
			try {
				const getHabits = await AsyncStorage.getItem("habits");
				if (getHabits !== null) {
					setHabits(JSON.parse(getHabits));
				}
				const getCompletedHabits = await AsyncStorage.getItem(
					"completedHabits",
				);
				if (getCompletedHabits !== null) {
					setCompletedHabits(JSON.parse(getCompletedHabits));
				}
			} catch (e) {
				console.error("Error reading habits from AsyncStorage:", e);
			}
		})();
	}, []);

	//Save habits
	const saveHabit = async (habit: Habit) => {
		try {
			const storedHabits = await AsyncStorage.getItem("habits");
			const storedHabitsArray = storedHabits ? JSON.parse(storedHabits) : [];

			storedHabitsArray.push(habit);

			await AsyncStorage.setItem("habits", JSON.stringify(storedHabitsArray));

			console.log("Hábito guardado en AsyncStorage.");
			setHabits([...storedHabitsArray]);
			navigation.goBack(); // Use navigation to go back
		} catch (error) {
			console.error("Error al guardar el hábito:", error);
		}
	};

	//Remove habits
	const removeHabit = async (habitId: string) => {
		try {
			const storedHabits = await AsyncStorage.getItem("habits");
			const storedHabitsArray = storedHabits ? JSON.parse(storedHabits) : [];

			const indexToRemove = storedHabitsArray.findIndex(
				(habit: Habit) => habit.id === habitId,
			);

			if (indexToRemove !== -1) {
				storedHabitsArray.splice(indexToRemove, 1);

				await AsyncStorage.setItem("habits", JSON.stringify(storedHabitsArray));

				console.log("Hábito eliminado de AsyncStorage.");
				setHabits(storedHabitsArray);
			}
		} catch (error) {
			console.error("Error al eliminar el hábito:", error);
		}
	};

	const completeHabit = async (habitId: string) => {
		try {
			const habitToComplete = habits.find((habit) => habit.id === habitId);
			if (habitToComplete) {
				if (habitToComplete.requires_goal) {
					const updatedCompletedHabits = [...completedHabits];
					const existingCompletion = completedHabits.find(
						(completion) => completion.habitId === habitId,
					);

					if (existingCompletion) {
						existingCompletion.progress =
							(existingCompletion.progress || 0) + 1;
					} else {
						const completion: HabitCompletion = {
							id: randomUUID(),
							habitId: habitId,
							date: new Date(),
							progress: 1,
						};
						updatedCompletedHabits.push(completion);
					}

					setCompletedHabits(updatedCompletedHabits);

					await AsyncStorage.setItem(
						"completedHabits",
						JSON.stringify(updatedCompletedHabits),
					);

					console.log("Hábito completado registrado con progreso.");
				} else {
					// Completa el hábito sin progreso
					const completion: HabitCompletion = {
						id: randomUUID(),
						habitId: habitId,
						date: new Date(),
					};
					const updatedCompletedHabits = [...completedHabits, completion];

					setCompletedHabits(updatedCompletedHabits);
					await AsyncStorage.setItem(
						"completedHabits",
						JSON.stringify(updatedCompletedHabits),
					);

					console.log("Hábito completado registrado.");
				}
			}
		} catch (error) {
			console.error("Error al guardar la completación del hábito:", error);
		}
	};

	const habitContextValue: HabitContextType = {
		habits,
		setHabits,
		saveHabit,
		removeHabit,
		completedHabits,
		completeHabit,
	};

	useEffect(() => {
		// Schedule notifications when habits change
		habits.forEach((habit) => {
			if (habit.reminders && habit.start_time) {
				schedulePushNotification(habit);
			}
		});
	}, [habits]);

	return (
		<HabitContext.Provider value={habitContextValue}>
			{children}
		</HabitContext.Provider>
	);
};

async function schedulePushNotification(habit: Habit) {
	const hour = parseInt(moment(habit.start_time, "HH:mm").format("HH"));
	const minute = parseInt(moment(habit.start_time, "HH:mm").format("mm"));

	await scheduleNotificationAsync({
		content: {
			title: t("reminder"),
			body: `¡${t("is-time")} "${habit.name}"!`,
			data: { habitId: habit.id },
		},
		trigger: { hour: hour, minute: minute },
	});
}
