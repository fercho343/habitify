import RNDateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { t } from "i18next";
import moment from "moment";
import React from "react";
import { Controller } from "react-hook-form";
import { Platform, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { Text } from "../Text";
import { Row } from "./styled";

interface Props {
	control: any;
	watch: any;
	setValue: any;
}

export const TimeInput: React.FC<Props> = ({ control, watch, setValue }) => {
	const theme = useTheme();

	const showTimePicker = () => {
		const date = moment(
			`${moment().format("YYYY-MM-DD")} ${watch("startTime")}`,
			"YYYY-MM-DD HH:mm",
		);
		DateTimePickerAndroid.open({
			value: date.toDate(),
			onChange: (event, date) =>
				setValue("startTime", moment(date).format("HH:mm")),
			mode: "time",
			maximumDate: new Date(),
			positiveButton: {
				label: t("accept"),
			},
			negativeButton: {
				label: t("cancel"),
				textColor: theme.colors.error,
			},
		});
	};

	return (
		<Row>
			<Text variant="subtitle_medium">{t("define-time")}</Text>
			<Controller
				name="startTime"
				control={control}
				rules={{
					required: {
						value: true,
						message: t("error.start-time"),
					},
				}}
				render={({ field: { onChange, value }, fieldState: { error } }) => {
					const date = moment(
						`${moment().format("YYYY-MM-DD")} ${value}`,
						"YYYY-MM-DD HH:mm",
					);

					return (
						<>
							{Platform.OS === "ios" ? (
								<RNDateTimePicker
									value={date.toDate()}
									onChange={(event, date) =>
										onChange(moment(date).format("HH:mm"))
									}
									mode="time"
								/>
							) : (
								<TouchableOpacity onPress={showTimePicker}>
									<Text>{watch("startTime")}</Text>
								</TouchableOpacity>
							)}
						</>
					);
				}}
			/>
		</Row>
	);
};
