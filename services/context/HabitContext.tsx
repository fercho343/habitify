import { Habit, HabitCompletion } from "@/types/habit";
import { ReactNode, createContext, useContext, useState } from "react";

interface HabitContextType {
	habits: Habit[];
	addHabit: (newHabit: Habit) => void;
	updateHabit: (habitId: string, updatedHabit: Habit) => void;
	removeHabit: (habitId: string) => void;
	completedHabits: HabitCompletion[];
	markHabitAsCompleted: (habitId: string) => void;
}

export const HabitContext = createContext<HabitContextType>({
	habits: [],
	addHabit: (newHabit: Habit) => {},
	updateHabit: (habitId: string, updatedHabit: Habit) => {},
	removeHabit: (habitId: string) => {},
	completedHabits: [],
	markHabitAsCompleted: (habitId: string) => {},
});

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [completedHabits, setCompletedHabits] = useState<HabitCompletion[]>([]);

	const addHabit = (newHabit: Habit) => {
		// Implementación de agregar hábito
	};

	const updateHabit = (habitId: string, updatedHabit: Habit) => {
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

export function useHabitContext() {
	return useContext(HabitContext);
}
