import { ColorInput } from "@/components/ColorInput";
import { IconInput } from "@/components/IconInput";
import { TextInput } from "@/components/TextInput";
import { Habit } from "@/types/habit";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Body, Divider, Row } from "./styled";

export const FormAddHabit = () => {
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<Habit>({
		defaultValues: {
			name: "",
			description: "",
			icon: "",
			color: "#ffffff",
			requiresGoal: false,
			goalAmount: 1,
			measureUnit: "",
			daysOfWeek: [
				"monday",
				"tuesday",
				"wednesday",
				"thursday",
				"friday",
				"saturday",
				"sunday",
			],
			hasReminder: true,
			startTime: "00:00",
		},
	});

	return (
		<Body>
			<ScrollView>
				<TextInput
					control={control}
					name="name"
					label={t("name")}
					placeholder={t("placeholder.habit_name")}
					rules={{
						required: {
							value: true,
							message: t("error.name"),
						},
					}}
				/>

				<TextInput
					control={control}
					name="description"
					label={t("description")}
					placeholder={t("placeholder.description")}
					multiline={true}
					numberOfLines={5}
					style={{ maxHeight: 100 }}
				/>

				<Divider />

				<Row>
					<IconInput control={control} />
					<ColorInput control={control} />
				</Row>
				<Divider />
			</ScrollView>
		</Body>
	);
};
