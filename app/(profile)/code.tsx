import { Layout } from "@/src/constants/layout";
import { Code } from "@/src/features/profile/code";
import { t } from "i18next";

export default function CodeScreen() {
	return (
		<Layout label={t("code")} useBack useTop={false}>
			<Code />
		</Layout>
	);
}
