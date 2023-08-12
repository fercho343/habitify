import { Text } from "@/components/Text";
import { Layout } from "@/infrastructure/layout";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";

export default function ProgressScreen() {
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text variant="headline_small">{t("comming-soon")}</Text>
			</View>
		</Layout>
	);
}
