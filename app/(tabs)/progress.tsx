import { Text } from "@/components/Text";
import { Layout } from "@/constants/Layout";
import { Calendar } from "@/features/pogress/Calendar";
import { HabitList } from "@/features/pogress/HabitList";
import { t } from "i18next";
import moment from "moment";
import { useState } from "react";

export default function ProgressScreen() {
	const today = new Date();
	const [selectedDay, setSelectedDay] = useState(today.getDate());
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [currentYear, setCurrentYear] = useState(today.getFullYear());

	const date = moment({
		year: currentYear,
		month: currentMonth,
		day: selectedDay,
	});

	return (
		<Layout>
			<Text
				variant="subtitle_large"
				style={{ textAlign: "center", marginBottom: 20, fontSize: 25 }}
			>
				{t("progress")}
			</Text>

			<Calendar
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
				currentMonth={currentMonth}
				setCurrentMonth={setCurrentMonth}
				currentYear={currentYear}
				setCurrentYear={setCurrentYear}
			/>

			<HabitList date={date} />
		</Layout>
	);
}
