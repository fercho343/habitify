import { Calendar } from "@/src/components/calendar";
import { Layout } from "@/src/constants/layout";
import { DayItem } from "@/src/features/progress/day-item";
import { View } from "@gluestack-ui/themed";
import { t } from "i18next";

export default function ProgressScreen() {
	return (
		<Layout label={t("progress")} useBottomBar>
			<View mt={20}>
				<Calendar
					renderItem={({ day, key }) => <DayItem key={key} day={day} />}
				/>
			</View>
		</Layout>
	);
}
