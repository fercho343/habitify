import { TextInput } from "@/components/TextInput";
import React from "react";
import { useForm } from "react-hook-form";
import { Body } from "./styled";

export const FormAddHabit = () => {
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			description: "",
			icon: "",
			color: "#ffffff",
			requires_goal: false,
			goal: 1,
			measure: "",
			frequencies: [
				"monday",
				"tuesday",
				"wednesday",
				"thursday",
				"friday",
				"saturday",
				"sunday",
			],
			reminders: true,
			start_time: "00:00",
		},
	});

	return (
		<Body>
			<TextInput control={control} name="name" />
		</Body>
	);
};
