import { BarUser } from "@/features/Home/BarUser";
import { Motivational } from "@/features/Home/Motivational";
import { Week } from "@/features/Home/Week";
import { Layout } from "@/infrastructure/layout";

export default function TabOneScreen() {
	return (
		<Layout>
			<BarUser />
			<Week />
			<Motivational />
		</Layout>
	);
}
