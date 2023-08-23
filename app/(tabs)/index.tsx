import { Layout } from "@/constants/Layout";
import { BarUser } from "@/features/home/BarUser";
import { MotivationalPhrase } from "@/features/home/MotivationalPhrase";
import { ProgressWeek } from "@/features/home/ProgressWeek";

export default function TabOneScreen() {
	return (
		<Layout>
			<BarUser />
			<ProgressWeek />
			<MotivationalPhrase />
		</Layout>
	);
}
