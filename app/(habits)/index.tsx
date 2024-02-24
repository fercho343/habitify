import { Layout } from "@/src/constants/layout";
import { TopBar } from "@/src/features/home/habits/top-bar";
import { WeekProgress } from "@/src/features/home/habits/week-progress";

export default function HomeScreen() {
	return (
		<Layout useAppBar={false} useBottomBar>
			<TopBar />
			<WeekProgress />
		</Layout>
	);
}
