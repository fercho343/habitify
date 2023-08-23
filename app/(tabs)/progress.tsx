import { Text } from "@/components/Text";
import { Layout } from "@/constants/Layout";
import { Calendar } from "@/features/pogress/Calendar";
import { t } from "i18next";

export default function ProgressScreen() {
	return (
		<Layout>
			<Text
				variant="subtitle_large"
				style={{ textAlign: "center", marginBottom: 20, fontSize: 25 }}
			>
				{t("progress")}
			</Text>
			<Calendar />
		</Layout>
	);
}
