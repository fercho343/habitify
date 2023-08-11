import { HabitContext } from "@/infrastructure/context/HabitsContext";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { Item } from "./Item";

export const Habits = () => {
	const habitContext = useContext(HabitContext);
	if (!habitContext) {
		throw new Error("HabitContext not available");
	}
	const { habits } = habitContext;

	return (
		<ScrollView
			style={{ marginTop: 16, marginBottom: 50 }}
			showsVerticalScrollIndicator={false}
		>
			{habits.map((habit) => (
				<Item key={habit.id} {...habit} />
			))}
		</ScrollView>
	);
};
