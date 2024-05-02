import { HabitForm } from "@/src/types/habit";
import { HStack, Text } from "@gluestack-ui/themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { t } from "i18next";
import moment from "moment";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { Platform } from "react-native";

interface Props {
	control: Control<HabitForm>;
}

export const TimeImput: FC<Props> = ({ control }) => {
	return (
		<HStack justifyContent="space-between" mb={15}>
			<Text size="lg">{t("definedHour")}</Text>

			{Platform.OS === "ios" && (
				<Controller
					control={control}
					name="startTime"
					render={({ field: { value, onChange } }) => {
						const [hour, minutes] = value.split(":");
						const date = moment().set({
							hour: Number.parseInt(hour),
							minutes: Number.parseInt(minutes),
							second: 0,
						});

						return (
							<RNDateTimePicker
								value={date.toDate()}
								onChange={(event, date) => {
									onChange(moment(date).format("HH:mm"));
								}}
								mode="time"
							/>
						);
					}}
				/>
			)}
		</HStack>
	);
};
