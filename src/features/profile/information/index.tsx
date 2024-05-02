import { ScrollView, Text, View } from "@gluestack-ui/themed";
import { t } from "i18next";
import React from "react";

export const Information = () => {
	return (
		<View flex={1}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View>
					<Text size="lg">{t("information.title.important")}</Text>
					<Text size="sm">{t("information.description.important")}</Text>
				</View>

				<View mt="$2">
					<Text size="lg">{t("information.title.privacity")}</Text>
					<Text size="sm">{t("information.description.privacity")}</Text>
				</View>

				<View mt="$2">
					<Text size="lg">{t("information.title.remember")}</Text>
					<Text size="sm">{t("information.description.remember")}</Text>
				</View>
			</ScrollView>
		</View>
	);
};
