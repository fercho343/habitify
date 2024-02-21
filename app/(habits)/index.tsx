import { Layout } from "@/src/constants/layout";
import { TopBar } from "@/src/features/home/top-bar";

export default function HomeScreen() {
	return (
		<Layout useAppBar={false}>
			<TopBar />
		</Layout>
	);
}
