import { Frequency } from "@/src/types/habit";
import { Divider, HStack, Text, VStack } from "@gluestack-ui/themed";
import { t } from "i18next";
import { Control, Controller } from "react-hook-form";
import { Item } from "./item";

export const FrequencieButtons: React.FC<Props> = ({ control }) => {
	return (
		<VStack space="xs">
			<Text>{t("frequencie")}</Text>
			<Controller
				control={control}
				name="frequency"
				render={({ field: { onChange, value } }) => {
					const isInclude = (day: Frequency) =>
						value.find((item: string) => item === day) ? true : false;

					const updateValue = (day: Frequency) => {
						if (isInclude(day)) {
							onChange(value.filter((item: string) => item !== day));
						} else {
							onChange([...value, day]);
						}
					};

					return (
						<HStack justifyContent="space-between" >
							<Item
								text={t("days.monday").substring(0, 2)}
								isActive={isInclude("monday")}
								onPress={() => updateValue("monday")}
							/>
							<Item
								text={t("days.tuesday").substring(0, 2)}
								isActive={isInclude("tuesday")}
								onPress={() => updateValue("tuesday")}
							/>
							<Item
								text={t("days.wednesday").substring(0, 2)}
								isActive={isInclude("wednesday")}
								onPress={() => updateValue("wednesday")}
							/>
							<Item
								text={t("days.thursday").substring(0, 2)}
								isActive={isInclude("thursday")}
								onPress={() => updateValue("thursday")}
							/>
							<Item
								text={t("days.friday").substring(0, 2)}
								isActive={isInclude("friday")}
								onPress={() => updateValue("friday")}
							/>
							<Item
								text={t("days.saturday").substring(0, 2)}
								isActive={isInclude("saturday")}
								onPress={() => updateValue("saturday")}
							/>
							<Item
								text={t("days.sunday").substring(0, 2)}
								isActive={isInclude("sunday")}
								onPress={() => updateValue("sunday")}
							/>
						</HStack>
					);
				}}
			/>
			<Divider my={10} />
		</VStack>
	);
};

interface Props {
	control: Control<any>;
}
