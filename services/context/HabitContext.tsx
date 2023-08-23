import { Habit, HabitCompletion } from "@/types/habit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

interface HabitContextType {
	habits: Habit[];
	addHabit: (newHabit: Habit) => Promise<boolean>;
	updateHabit: (habitId: string, updatedHabit: Habit) => Promise<boolean>;
	removeHabit: (habitId: string) => void;
	completedHabits: HabitCompletion[];
	markHabitAsCompleted: (habitId: string) => void;
}

export const HabitContext = createContext<HabitContextType>({
	habits: [],
	addHabit: async (newHabit: Habit) => false,
	updateHabit: async (habitId: string, updatedHabit: Habit) => false,
	removeHabit: (habitId: string) => {},
	completedHabits: [],
	markHabitAsCompleted: (habitId: string) => {},
});

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [completedHabits, setCompletedHabits] = useState<HabitCompletion[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const getHabits = await AsyncStorage.getItem("@habits");
				if (getHabits !== null) {
					setHabits(JSON.parse(getHabits));
				}

				const getCompletedHabits = await AsyncStorage.getItem(
					"@completedHabits",
				);

				if (getCompletedHabits !== null) {
					setCompletedHabits(JSON.parse(getCompletedHabits));
				}
			} catch (error) {}

			// AsyncStorage.removeItem("@completedHabits");
		})();
	}, []);

	const addHabit = async (newHabit: Habit): Promise<boolean> => {
		try {
			const storedHabits = await AsyncStorage.getItem("@habits");
			const storedHabitsArray = storedHabits ? JSON.parse(storedHabits) : [];
			storedHabitsArray.push(newHabit);

			await AsyncStorage.setItem("@habits", JSON.stringify(storedHabitsArray));
			setHabits([...storedHabitsArray]);
			console.log("Save habit in AsyncStorage.");
			return true;
		} catch (error) {
			console.log("Error try saving habit", error);
			return false;
		}
	};

	const updateHabit = async (
		habitId: string,
		updatedHabit: Habit,
	): Promise<boolean> => {
		try {
			const storedHabits = await AsyncStorage.getItem("@habits");
			const storedHabitsArray = storedHabits ? JSON.parse(storedHabits) : [];

			const habitIndex = storedHabitsArray.findIndex(
				(habit: Habit) => habit.id === habitId,
			);

			if (habitIndex !== -1) {
				updatedHabit.id = habitId;
				storedHabitsArray.splice(habitIndex, 1, updatedHabit);
				await AsyncStorage.setItem("habits", JSON.stringify(storedHabitsArray));
				setHabits([...storedHabitsArray]);
			}

			return true;
		} catch (error) {
			return false;
		}
	};

	const removeHabit = async (habitId: string) => {
		const storedHabits = await AsyncStorage.getItem("@habits");
		const storedHabitsArray = storedHabits ? JSON.parse(storedHabits) : [];

		const indexToRemove = storedHabitsArray.findIndex(
			(habit: Habit) => habit.id === habitId,
		);

		if (indexToRemove !== -1) {
			storedHabitsArray.splice(indexToRemove, 1);
			await AsyncStorage.setItem("@habits", JSON.stringify(storedHabitsArray));
			setHabits(storedHabitsArray);
			console.log("Delete habit from AsyncStorage.");
		}
	};

	const markHabitAsCompleted = async (habitId: string) => {
		try {
			const habitToComplete = habits.find((habit) => habit.id === habitId);
			if (!habitToComplete) return;

			const updatedCompletedHabits = [...completedHabits];
			const existingCompletion = completedHabits.find(
				(completion) => completion.habitId === habitId,
			);
			const progressPercent = existingCompletion
				? (existingCompletion.progressPercent || 0) + 1
				: 1;

			const completion: HabitCompletion = {
				id: randomUUID(),
				habitId,
				completionDate: new Date(),
				progressPercent,
			};

			updatedCompletedHabits.push(completion);
			setCompletedHabits(updatedCompletedHabits);

			await AsyncStorage.setItem(
				"@completedHabits",
				JSON.stringify(updatedCompletedHabits),
			);
		} catch (error) {
			console.error("Error al guardar la completación del hábito:", error);
		}
	};

	const habitContextValue: HabitContextType = {
		habits,
		addHabit,
		updateHabit,
		removeHabit,
		completedHabits,
		markHabitAsCompleted,
	};

	return (
		<HabitContext.Provider value={habitContextValue}>
			{children}
		</HabitContext.Provider>
	);
};

interface HabitProviderProps {
	children: ReactNode;
}

export function useHabit() {
	return useContext(HabitContext);
}
