import { Layout } from "@/src/constants/layout";
import { t } from "i18next";

export default function Information() {
	return (
		<Layout label={t("information")} useBack useTop={false}>
			<></>
		</Layout>
	);
}
