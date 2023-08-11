import { Text } from "@/components/Text";
import { Habit } from "@/types/habits";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { t } from "i18next";
import React, { useRef } from "react";
import { Text as TextNative, View } from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import {
	Body,
	Box,
	Content,
	Controls,
	Icon,
	Separation,
	SwipContent,
} from "./styled";

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

	// Swippeable
	const swipeableRef = useRef<Swipeable>(null);
	const handlePress = () => {
		swipeableRef.current?.close();
		//Remove
	};

	const renderLeftActions = () => {
		return (
			<SwipContent onPress={handlePress}>
				<MaterialCommunityIcons name="delete" size={25} color="#fff" />
				<Text variant="body_small" style={{ color: "#fff" }}>
					{t("delete.delete")}
				</Text>
			</SwipContent>
		);
	};

	return (
		<Body>
			<Swipeable
				renderRightActions={renderLeftActions}
				overshootRight={false}
				ref={swipeableRef}
			>
				<Box>
					<Icon $color={color}>
						<TextNative style={{ fontSize: 30 }}>{icon}</TextNative>
					</Icon>
					<Content>
						<View>
							<Text variant="subtitle_medium" style={{ marginBottom: 5 }}>
								{name}
							</Text>
							{requires_goal ? (
								<Text variant="body_medium">
									0{" "}
									<Text style={{ color: theme.colors.disabled }}>
										{`${t("of")} ${goal} ${measure}`}{" "}
									</Text>
								</Text>
							) : (
								<Text variant="body_small">A las {start_time}</Text>
							)}
						</View>

						{requires_goal ? (
							<Controls>
								<TouchableOpacity>
									<Entypo name="plus" color="#fff" size={30} />
								</TouchableOpacity>
								<Separation />
								<TouchableOpacity>
									<Entypo name="minus" color="#fff" size={30} />
								</TouchableOpacity>
							</Controls>
						) : (
							<TouchableOpacity>
								<AntDesign
									name="checkcircle"
									size={40}
									color={theme.colors.primary}
								/>
							</TouchableOpacity>
						)}
					</Content>
				</Box>
			</Swipeable>
		</Body>
	);
};
