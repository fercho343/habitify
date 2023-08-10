import { BarUser } from "@/features/Home/BarUser";
import { Week } from "@/features/Home/Week";
import { Layout } from "@/infrastructure/layout";

export default function TabOneScreen() {
	return (
		<Layout>
			<BarUser />
			<Week />
		</Layout>
	);
}
