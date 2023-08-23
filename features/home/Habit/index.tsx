import { useHabit } from "@/services/context/HabitContext";
import React from "react";
import { ScrollView } from "react-native";
import { Item } from "./Item";

export const Habit = () => {
	const { habits } = useHabit();

	return (
		<ScrollView
			style={{ marginTop: 16, marginBottom: 50 }}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flexGrow: 1 }}
		>
			{habits.map((habit) => (
				<Item key={habit.id} {...habit} />
			))}
		</ScrollView>
	);
};
