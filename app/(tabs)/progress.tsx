import { Text } from "@/components/Text";
import { Calendar } from "@/features/Progress/Calendar";
import { Layout } from "@/infrastructure/layout";
import { t } from "i18next";
import React from "react";

export default function ProgressScreen() {
	return (
		<Layout>
			<Text variant="subtitle_medium">{t("progress")}</Text>
			<Calendar />
		</Layout>
	);
}
