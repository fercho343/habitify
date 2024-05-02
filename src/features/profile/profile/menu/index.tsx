import { ClockIcon, MailIcon, View } from "@gluestack-ui/themed";
import { t } from "i18next";
import { BookMarked, Heart, InfoIcon } from "lucide-react-native";
import { Item } from "./item";

export const Menu = () => {
	return (
		<View>
			<Item icon={BookMarked} text={t("diary")} to="journal" />
			<Item icon={ClockIcon} text={t("schedule")} to="schedules" />
			<Item icon={InfoIcon} text={t("information.information")} to="information" />
			<Item icon={Heart} text={t("donations")} to="donations" />
			<Item icon={MailIcon} text={t("contactUs")} />
		</View>
	);
};
