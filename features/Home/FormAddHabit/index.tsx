import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { Habit } from "@/types/habits";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { t } from "i18next";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ColorButton } from "./ColorButton";
import { IconBox } from "./IconBox";
import { Colum, Form, Row } from "./styled";

export const FormAddHabit = () => {
	const { control, handleSubmit } = useForm<Habit>({
		defaultValues: {
			name: "",
			description: "",
			icon: "",
			color: "#ffffff",
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
