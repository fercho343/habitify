import { Text } from "@/components/Text";
import { Habit } from "@/types/habits";
import { Entypo } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { Text as TextNative, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Body, Content, Controls, Icon, Separation } from "./styled";

export const Item = ({
	id,
	name,
	description,
	icon,
	color,
	requires_goal,
	goal,
	measure,
	frequencies,
	reminders,
	start_time,
}: Habit) => {
	const theme = useTheme();
	console.log(measure);

	return (
		<Body>
			<Icon>
				<TextNative style={{ fontSize: 30 }}>💧</TextNative>
			</Icon>
			<Content>
				<View>
					<Text variant="body_medium">{name}</Text>
					<Text variant="body_medium">
						0{" "}
						<Text style={{ color: theme.colors.disabled }}>
							{`${t("of")} ${goal} ${measure}`}{" "}
						</Text>
					</Text>
				</View>

				{requires_goal && (
					<Controls>
						<Entypo name="plus" color="#fff" size={30} />
						<Separation />
						<Entypo name="minus" color="#fff" size={30} />
					</Controls>
				)}
			</Content>
		</Body>
	);
};
