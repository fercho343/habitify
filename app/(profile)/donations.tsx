import { Layout } from "@/src/constants/layout";
import { Donations } from "@/src/features/profile/donations";
import { t } from "i18next";

export default function DonationsScreen() {
	return (
		<Layout label={t("donations")} useBack useTop={false}>
			<Donations />
		</Layout>
	);
}
