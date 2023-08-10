import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { Day, Habit } from "@/types/habits";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { t } from "i18next";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Switch } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { ColorButton } from "./ColorButton";
import { DayField } from "./DayInput";
import { IconBox } from "./IconBox";
import { Colum, Divider, Form, Row } from "./styled";

export const FormAddHabit = () => {
	const theme = useTheme();
	const { control, watch, setValue, handleSubmit } = useForm<Habit>({
		defaultValues: {
			name: "",
			description: "",
			icon: "",
			color: "#ffffff",
			requires_goal: false,
			goal: 0,
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

	const updateFrequencies = (day: Day) => {
		const frequencies = watch("frequencies");

		if (frequencies.includes(day)) {
			// Si el día ya está en la lista, eliminarlo
			const updatedFrequencies = frequencies.filter((d) => d !== day);
			setValue("frequencies", updatedFrequencies);
		} else {
			// Si el día no está en la lista, agregarlo
			const updatedFrequencies = [...frequencies, day];
			setValue("frequencies", updatedFrequencies);
		}
	};

	const onSubmit = (data: Habit) => console.log(data);

	const [time, setTime] = useState(new Date());
	console.log(watch("frequencies"));

	return (
		<BottomSheetModalProvider>
			<Form>
				<ScrollView>
					<Row>
						<Text variant="subtitle_medium">{t("name")}</Text>
						<TextInput
							name="name"
							placeholder={t("placeholder.habit_name")}
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.name"),
								},
							}}
						/>
					</Row>

					<Row>
						<Text variant="subtitle_medium">{t("description")}</Text>
						<TextInput
							name="description"
							placeholder={t("placeholder.description")}
							control={control}
							multiline={true}
							numberOfLines={5}
							style={{ height: 50 }}
						/>
					</Row>

					<Divider />

					<Colum>
						<Controller
							name="icon"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.icon"),
								},
							}}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<IconBox
									value={value}
									onChange={onChange}
									error={error ? true : false}
								/>
							)}
						/>

						<Controller
							name="color"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.icon"),
								},
							}}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<ColorButton
									value={value}
									onChange={onChange}
									error={error ? true : false}
								/>
							)}
						/>
					</Colum>

					<Divider />

					<Colum style={{ justifyContent: "space-between" }}>
						<Text variant="subtitle_medium">Necesitas asinar una meta?</Text>
						<Controller
							name="requires_goal"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.icon"),
								},
							}}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<Switch
									trackColor={{ false: "#767577", true: theme.colors.primary }}
									thumbColor="#f4f3f4"
									ios_backgroundColor="#3e3e3e"
									onValueChange={(value) => onChange(value)}
									value={value}
									style={{ marginLeft: 15 }}
								/>
							)}
						/>
					</Colum>

					{watch("requires_goal") && <Text>Valor de medida</Text>}

					<Divider />

					<Colum style={{ justifyContent: "space-between" }}>
						<Text variant="subtitle_medium">Define una hora</Text>
						<RNDateTimePicker
							value={time}
							onChange={(event, date) => console.log(date)}
							mode="time"
						/>
					</Colum>
					<Divider />

					<DayField control={control} updateFrequencies={updateFrequencies} />

					<Divider />

					<Colum style={{ justifyContent: "space-between" }}>
						<Text variant="subtitle_medium">Notificar</Text>
						<Controller
							name="reminders"
							control={control}
							rules={{
								required: {
									value: true,
									message: t("error.icon"),
								},
							}}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<Switch
									trackColor={{ false: "#767577", true: theme.colors.primary }}
									thumbColor="#f4f3f4"
									ios_backgroundColor="#3e3e3e"
									onValueChange={(value) => onChange(value)}
									value={value}
									style={{ marginLeft: 15 }}
								/>
							)}
						/>
					</Colum>

					<TouchableOpacity
						style={{ marginTop: 100 }}
						onPress={handleSubmit(onSubmit)}
					>
						<Text>send</Text>
					</TouchableOpacity>
				</ScrollView>
			</Form>
		</BottomSheetModalProvider>
	);
};
