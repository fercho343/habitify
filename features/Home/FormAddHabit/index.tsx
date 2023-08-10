import { TextInput } from "@/components/TextInput";
import { Habit } from "@/types/habits";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, ScrollView } from "react-native";
import { Form } from "./styled";

export const FormAddHabit = () => {
	const { control, handleSubmit } = useForm<Habit>({
		defaultValues: {
			name: "",
			description: "",
			icon: "",
			color: "",
			requires_goal: false,
			goal: 0,
			measure: "",
			frequencies: [],
			reminders: true,
			start_time: "00:00",
		},
	});
	const onSubmit = (data: Habit) => console.log(data);

	return (
		<Form>
			<ScrollView>
				<TextInput
					name="name"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Name is required",
						},
					}}
				/>

				<Button title="Send" onPress={handleSubmit(onSubmit)} />
			</ScrollView>
		</Form>
	);
};
