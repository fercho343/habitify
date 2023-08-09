import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "styled-components/native";
import { Bar, Item, Label } from "./styled";

//@ts-ignore
export const TabBar = ({ state, descriptors, navigation }) => {
	const theme = useTheme();
	return (
		<Bar>
			{/* {state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						navigation.navigate({ name: route.name, merge: true });
					}
				};
				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{ flex: 1 }}
					>
						<Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})} */}

			<Item $isActive={true}>
				<Ionicons name="home" color={theme.colors.background} size={30} />
				<Label $isActive={true}>Home</Label>
			</Item>

			<Item $isActive={false}>
				<Ionicons name="bar-chart" color={"#5f5e5e"} size={30} />
				<Label $isActive={false}>Analytics</Label>
			</Item>

			<Item $isActive={false}>
				<Ionicons name="home" color={"#5f5e5e"} size={30} />
				<Label $isActive={false}>Home</Label>
			</Item>
		</Bar>
	);
};
