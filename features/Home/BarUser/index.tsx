import React from "react";
// import { Text } from "react-native";
import { Text } from "@/components/Text";
import { Avatar, Bar, UserBox } from "./styled";

export const BarUser = () => {
	return (
		<Bar>
			<UserBox>
				<Avatar source={require("@/assets/images/no-profile.png")} />
				<Text variant="subtitle_medium">Hello</Text>
			</UserBox>
		</Bar>
	);
};
