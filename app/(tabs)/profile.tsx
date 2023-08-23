import { Layout } from "@/constants/Layout";
import { Header } from "@/features/profile/Header";
import { Menu } from "@/features/profile/Menu";

export default function ProfileScreen() {
	return (
		<Layout>
			<Header />
			<Menu />
		</Layout>
	);
}
