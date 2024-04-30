import { Layout } from "@/src/constants/layout";
import { Profile } from "@/src/features/profile/profile";
import { t } from "i18next";

export default function Progress() {
	return (
		<Layout label={t("profile")} useBottomBar>
			<Profile />
		</Layout>
	);
}
