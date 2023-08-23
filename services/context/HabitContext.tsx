import { Habit, HabitCompletion } from "@/types/habit";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
	updateHabit: (habitId: string, updatedHabit: Habit) => void;
	removeHabit: (habitId: string) => void;
	completedHabits: HabitCompletion[];
	markHabitAsCompleted: (habitId: string) => void;
}

export const HabitContext = createContext<HabitContextType>({
	habits: [],
	addHabit: async (newHabit: Habit) => false,
	updateHabit: (habitId: string, updatedHabit: Habit) => {},
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
			} catch (error) {}
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

	const updateHabit = async (habitId: string, updatedHabit: Habit) => {
		// Implementación de actualizar hábito
	};

	const removeHabit = (habitId: string) => {
		// Implementación de eliminar hábito
	};

	const markHabitAsCompleted = (habitId: string) => {
		// Implementación de marcar hábito como completado
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
