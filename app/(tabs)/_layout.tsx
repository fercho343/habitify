import { TabBar } from "@/components/TabBar";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen name="index" />

			<Tabs.Screen name="progress" />

			<Tabs.Screen name="profile" />
		</Tabs>
	);
}
