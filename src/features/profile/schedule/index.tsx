import { View } from "@gluestack-ui/themed";
import { t } from "i18next";
import React from "react";
import { Item } from "./Item";

export const Schedules = () => {
	return (
		<View flex={1}>
			<Item day={t("days.monday")} hour="20:00" subject="Composicion digital" />
		</View>
	);
};
