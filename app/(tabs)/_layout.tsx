import { TabBar } from "@/components/TabBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useTheme } from "styled-components/native";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const theme = useTheme();

	return (
		<Tabs
			//@ts-ignore
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "yellow",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
				}}
			/>

			<Tabs.Screen
				name="progress"
				options={{
					title: "Progress",
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
				}}
			/>
		</Tabs>
	);
}
