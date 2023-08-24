import { useHabit } from "@/services/context/HabitContext";
import moment from "moment";
import React from "react";
import { ScrollView } from "react-native";
import { Item } from "./Item";

export const Habit = () => {
	const { habits } = useHabit();

	const sortedHabits = habits.sort((habitA, habitB) => {
		const startTimeA = moment(habitA.startTime, "hh:mm A");
		const startTimeB = moment(habitB.startTime, "hh:mm A");
		return startTimeA.isBefore(startTimeB) ? -1 : 1;
	});

	return (
		<ScrollView
			style={{ marginTop: 16, marginBottom: 50 }}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flexGrow: 1 }}
		>
			{sortedHabits.map((habit) => (
				<Item key={habit.id} {...habit} />
			))}
		</ScrollView>
	);
};
