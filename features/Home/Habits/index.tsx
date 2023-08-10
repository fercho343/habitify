import React from "react";
import { ScrollView } from "react-native";
import { Item } from "./Item";

export const Habits = () => {
	return (
		<ScrollView
			style={{ marginTop: 16, marginBottom: 50 }}
			showsVerticalScrollIndicator={false}
		>
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
		</ScrollView>
	);
};
