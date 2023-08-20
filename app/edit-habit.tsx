import { FormEditHabit } from "@/features/Home/FormEditHabit";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function EditHabitScreen() {
	const params = useLocalSearchParams()
	const habit = JSON.parse(params.habit.toString())

	return (
		<>
			<FormEditHabit {...habit} />
		</>
	)
}
