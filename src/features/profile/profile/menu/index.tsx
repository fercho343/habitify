import { ClockIcon, MailIcon, View } from "@gluestack-ui/themed";
import { t } from "i18next";
import { BookMarked, GithubIcon, Heart, InfoIcon } from "lucide-react-native";
import { Item } from "./item";

export const Menu = () => {
	return (
		<View mt="$2">
			<Item icon={BookMarked} text={t("diary")} />
			<Item icon={ClockIcon} text={t("schedule")} />
			<Item icon={InfoIcon} text={t("information")} />
			<Item icon={Heart} text={t("donations")} />
			<Item icon={GithubIcon} text={t("code")} />
            <Item icon={MailIcon} text={t('contactUs')} />
		</View>
	);
};
