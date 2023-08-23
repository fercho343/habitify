import { Layout } from "@/constants/Layout";
import { BarUser } from "@/features/home/BarUser";
import { ProgressWeek } from "@/features/home/ProgressWeek";

export default function TabOneScreen() {
	return (
		<Layout>
			<BarUser />
			<ProgressWeek />
		</Layout>
	);
}
