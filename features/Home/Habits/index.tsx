import { Text } from "@/components/Text";
import { HabitContext } from "@/services/context/HabitsContext";
import { Link } from "expo-router";
import { t } from "i18next";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { Item } from "./Item";
import { EmptyHabit, LinkText } from "./styled";

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
			contentContainerStyle={{ flexGrow: 1 }}
		>
			{habits.map((habit) => (
				<Item key={habit.id} {...habit} />
			))}

			{habits.length === 0 && (
				<EmptyHabit>
					<Text variant="headline_small" style={{ textAlign: "center" }}>
						{t("empty.habits")}
					</Text>
					<Link href="/add-habit" style={{ marginTop: 10 }}>
						<LinkText>{t("add-habit")}</LinkText>
					</Link>
				</EmptyHabit>
			)}
		</ScrollView>
	);
};
