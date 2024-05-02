import { Habit } from "@/src/types/habit";
import { useSQLiteContext } from "expo-sqlite/next";
import { createContext, useContext, useEffect, useState } from "react";
import { createHabitTable } from "../db/habits";

interface HabitContextType {
	habits: Habit[];
}

export const HabitContext = createContext<HabitContextType>({
	habits: [],
});

export const useHabit = () => {
	return useContext(HabitContext);
};

export const HabitProvider: React.FC<Props> = ({ children }) => {
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

	return (
		<HabitContext.Provider value={{ habits }}>{children}</HabitContext.Provider>
	);
};

interface Props {
	children: React.ReactNode;
}
