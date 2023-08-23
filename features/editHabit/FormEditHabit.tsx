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
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Body, Divider, Row } from "./styled";

interface Props {
	habit: Habit;
}

export const FormEditHabit: React.FC<Props> = ({ habit }) => {
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<Habit>({
		defaultValues: {
			name: habit.name,
			description: habit.description,
			icon: habit.icon,
			color: habit.color,
			requiresGoal: habit.requiresGoal,
			goalAmount: habit.goalAmount,
			measureUnit: habit.measureUnit,
			daysOfWeek: habit.daysOfWeek,
			hasReminder: habit.hasReminder,
			startTime: habit.startTime,
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

	const { updateHabit } = useHabit();

	const onSubmit = async (data: Habit) => {
		const wasAdd = await updateHabit(habit.id, data);

		if (wasAdd) {
			router.back();
		}
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

				<Button onPress={handleSubmit(onSubmit)}>{t("edit.habit")}</Button>
			</ScrollView>
		</Body>
	);
};
