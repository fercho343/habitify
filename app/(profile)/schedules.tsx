import { Layout } from "@/src/constants/layout";
import { Schedules } from "@/src/features/profile/schedule";
import { t } from "i18next";

export default function ScheduleScreen() {
	return (
		<Layout label={t("schedule")} useBack>
			<Schedules />
		</Layout>
	);
}
