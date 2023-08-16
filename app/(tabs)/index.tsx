import { BarUser } from "@/features/Home/BarUser";
import { Habits } from "@/features/Home/Habits";
import { Motivational } from "@/features/Home/Motivational";
import { Week } from "@/features/Home/Week";
import { Layout } from "@/infrastructure/layout";

export default function TabOneScreen() {

	// useEffect(() => {
	// 	(async () => {
	// 		cancelAllScheduledNotificationsAsync()
	// 		const notifications = await getAllScheduledNotificationsAsync()
	// 		console.log(notifications);
	// 	})()
	// })

	return (
		<Layout>
			<BarUser />
			<Week />
			<Motivational />
			<Habits />
		</Layout>
	);
}
