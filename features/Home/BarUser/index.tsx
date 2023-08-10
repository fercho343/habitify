import React from "react";
// import { Text } from "react-native";
import { Text } from "@/components/Text";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { Avatar, Bar, IconButton, UserBox } from "./styled";

export const BarUser = () => {
	const theme = useTheme();
	return (
		<Bar>
			<UserBox>
				<Avatar source={require("@/assets/images/no-profile.png")} />
				<View>
					<Text variant="subtitle_medium">Good Morning, Emma!</Text>
					<Text style={{ marginTop: 1 }}>Today Thursday, May 09</Text>
				</View>
			</UserBox>

			<IconButton>
				<AntDesign name="plus" color={theme.colors.background} size={25} />
			</IconButton>
		</Bar>
	);
};
