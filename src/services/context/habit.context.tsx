import { createContext, useContext } from "react";

export const HabitContext = createContext<null>(null);

export const useHabit = () => {
	return useContext(HabitContext);
};

export const HabitProvider: React.FC<Props> = ({ children }) => {
	return <HabitContext.Provider value={null}>{children}</HabitContext.Provider>;
};

interface Props {
	children: React.ReactNode;
}
