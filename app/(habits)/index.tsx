import { Layout } from "@/src/constants/layout";
import { Habits } from "@/src/features/home/habits/habits";
import { Phrase } from "@/src/features/home/habits/phrase";
import { TopBar } from "@/src/features/home/habits/top-bar";
import { WeekProgress } from "@/src/features/home/habits/week-progress";

export default function HomeScreen() {
	return (
		<Layout useAppBar={false} useBottomBar>
			<TopBar />
			<WeekProgress />
			<Phrase />
			<Habits />
		</Layout>
	);
}
