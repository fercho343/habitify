import { HStack, Text } from "@gluestack-ui/themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { t } from "i18next";
import moment from "moment";
import { Platform } from "react-native";

export const TimeImput = () => {
    const date = moment()
	return (
		<HStack justifyContent="space-between" mb={15}>
			<Text size="lg">{t("definedHour")}</Text>

			{Platform.OS === "ios" && (
				<RNDateTimePicker
					value={date.toDate()}
					onChange={(event, date) => {}}
					mode="time"
				/>
			)}
		</HStack>
	);
};
