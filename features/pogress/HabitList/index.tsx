import { Text } from "@/components/Text";
import { useHabit } from "@/services/context/HabitContext";
import { Habit } from "@/types/habit";
import { t } from "i18next";
import moment, { Moment } from "moment";
import React from "react";
import { ScrollView } from "react-native";
import { Body, Item } from "./styled";

interface Props {
	date: Moment;
}

export const HabitList: React.FC<Props> = ({ date }) => {
	const { completedHabits, habits } = useHabit();

	const findHabitByHabitId = (habitId: string): Habit | undefined => {
		return habits.find((habit) => habit.id === habitId);
	};

	const habitsCompletedOnSelectedDate = completedHabits.filter((completion) =>
		moment(completion.completionDate).isSame(date, "day"),
	);

	return (
		<Body>
			<Text variant="subtitle_medium">
				{t("completed-habits")} {date.format("MM/DD/yyyy")}
			</Text>

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ marginTop: 15 }}
				bounces={false}
			>
				{habitsCompletedOnSelectedDate.map((completion) => {
					const habit = findHabitByHabitId(completion.habitId);
					if (habit) {
						return (
							<Item key={completion.id}>
								<Text>- {habit.name}</Text>
							</Item>
						);
					}
					return null;
				})}
			</ScrollView>
		</Body>
	);
};
