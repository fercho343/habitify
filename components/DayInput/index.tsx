import { Text } from "@/components/Text";
import { DayOfWeek } from "@/types/habit";
import { t } from "i18next";
import React from "react";
import { Controller } from "react-hook-form";
import { Item } from "./Item";
import { Row } from "./styled";

interface Props {
	control: any;
	updateFrequencies: (day: DayOfWeek) => void;
}

export const DayField = ({ control, updateFrequencies }: Props) => {
	return (
		<>
			<Text variant="subtitle_medium">Frecuencia</Text>
			<Controller
				name="daysOfWeek"
				control={control}
				render={({ field: { onChange, value } }) => {
					const isExist = (day: DayOfWeek) =>
						value.find((item: string) => item === day);

					return (
						<Row>
							<Item
								label={t("monday").substring(0, 2)}
								status={isExist("monday") ? "checked" : "unchecked"}
								onPress={() => updateFrequencies("monday")}
							/>

							<Item
								label={t("tuesday").substring(0, 2)}
								status={isExist("tuesday") ? "checked" : "unchecked"}
								onPress={() => updateFrequencies("tuesday")}
							/>

							<Item
								label={t("wednesday").substring(0, 2)}
								status={isExist("wednesday") ? "checked" : "unchecked"}
								onPress={() => updateFrequencies("wednesday")}
							/>

							<Item
								label={t("thursday").substring(0, 2)}
								status={isExist("thursday") ? "checked" : "unchecked"}
								onPress={() => updateFrequencies("thursday")}
							/>

							<Item
								label={t("friday").substring(0, 2)}
								status={isExist("friday") ? "checked" : "unchecked"}
								onPress={() => updateFrequencies("friday")}
							/>

							<Item
								label={t("saturday").substring(0, 2)}
								status={isExist("saturday") ? "checked" : "unchecked"}
								onPress={() => updateFrequencies("saturday")}
							/>

							<Item
								label={t("sunday").substring(0, 2)}
								status={isExist("sunday") ? "checked" : "unchecked"}
								onPress={() => updateFrequencies("sunday")}
							/>
						</Row>
					);
				}}
			/>
		</>
	);
};
