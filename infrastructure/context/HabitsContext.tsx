import { Habit } from "@/types/habits";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface HabitContextType {
	habits: Habit[];
	setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

export const HabitContext = createContext<HabitContextType | undefined>(
	undefined,
);

interface HabitProviderProps {
	children: ReactNode;
}

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
	const [habits, setHabits] = useState<Habit[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const value = await AsyncStorage.getItem("habits");
				if (value !== null) {
					setHabits(JSON.parse(value));
				}
			} catch (e) {
				// error reading value
			}
		})();
	}, []);

	const habitContextValue: HabitContextType = {
		habits,
		setHabits,
	};

	return (
		<HabitContext.Provider value={habitContextValue}>
			{children}
		</HabitContext.Provider>
	);
};
