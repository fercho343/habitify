import { Layout } from "@/src/constants/layout";
import { Information } from "@/src/features/profile/information";
import { t } from "i18next";

export default function InformationScreen() {
	return (
		<Layout label={t("information.information")} useBack useTop={false}>
			<Information />
		</Layout>
	);
}
