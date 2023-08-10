import { Text } from "@/components/Text";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text as TextNative, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Body, Content, Controls, Icon, Separation } from "./styled";

export const Item = () => {
	const theme = useTheme();
	return (
		<Body>
			<Icon>
				<TextNative style={{ fontSize: 30 }}>💧</TextNative>
			</Icon>
			<Content>
				<View>
					<Text variant="body_medium">Drink Water</Text>
					<Text variant="body_medium">
						2000ml{" "}
						<Text style={{ color: theme.colors.disabled }}>of 3000ml</Text>
					</Text>
				</View>

				<Controls>
					<Entypo name="plus" color="#fff" size={30} />

					<Separation />

					<Entypo name="minus" color="#fff" size={30} />
				</Controls>
			</Content>
		</Body>
	);
};
