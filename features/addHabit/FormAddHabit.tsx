import { Button } from "@/components/Button";
import { ColorInput } from "@/components/ColorInput";
import { DayField } from "@/components/DayInput";
import { GoalField } from "@/components/GoalField";
import { IconInput } from "@/components/IconInput";
import { SwichControl } from "@/components/SwichControl";
import { TextInput } from "@/components/TextInput";
import { TimeInput } from "@/components/TimeInput";
import { useHabit } from "@/services/context/HabitContext";
import { DayOfWeek, Habit } from "@/types/habit";
import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
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
			id: randomUUID(),
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

	const updateFrequencies = (day: DayOfWeek) => {
		const daysOfWeek = watch("daysOfWeek");

		if (daysOfWeek.includes(day)) {
			const updatedFrequencies = daysOfWeek.filter((d) => d !== day);
			setValue("daysOfWeek", updatedFrequencies);
		} else {
			const updatedFrequencies = [...daysOfWeek, day];
			setValue("daysOfWeek", updatedFrequencies);
		}
	};

	const { addHabit } = useHabit();

	const onSubmit = async (data: Habit) => {
		const wasAdd = await addHabit(data);

		if (wasAdd) {
			router.back();
		}

		// saveHabit(habit);
	};

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
					style={{ maxHeight: 70, minHeight: 50 }}
				/>

				<Divider />

				<Row>
					<IconInput control={control} />
					<ColorInput control={control} />
				</Row>
				<Divider />

				<SwichControl
					control={control}
					name="requiresGoal"
					label={t("need-goal")}
				/>

				{watch("requiresGoal") && (
					//@ts-ignore
					<GoalField control={control} requires_goal={watch("requiresGoal")} />
				)}
				<Divider />

				<DayField control={control} updateFrequencies={updateFrequencies} />

				<Divider />

				<SwichControl
					control={control}
					name="hasReminder"
					label={t("has-reminder")}
				/>

				<Divider />

				<TimeInput control={control} watch={watch} setValue={setValue} />

				<Button onPress={handleSubmit(onSubmit)}>{t("add-habit")}</Button>
			</ScrollView>
		</Body>
	);
};
