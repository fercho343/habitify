import { useSQLiteContext } from "expo-sqlite/next";
import { createContext, useContext, useEffect } from "react";
import { createHabitTable } from "../db/habits";

export const HabitContext = createContext<null>(null);

export const useHabit = () => {
	return useContext(HabitContext);
};

export const HabitProvider: React.FC<Props> = ({ children }) => {
	const db = useSQLiteContext();

	useEffect(() => {
		createHabitTable(db);

		(async () => {
			const result = await db.getAllAsync("SELECT * FROM habits");
			console.log(result);
		})();
	});

	const addHabit = async () => {};

	return <HabitContext.Provider value={null}>{children}</HabitContext.Provider>;
};

interface Props {
	children: React.ReactNode;
}
