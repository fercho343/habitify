import { Text } from "@/components/Text";
import { HabitContext } from "@/services/context/HabitsContext";
import { Habit } from "@/types/habits";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { t } from "i18next";
import moment from "moment";
import React, { useContext, useRef } from "react";
import { Text as TextNative, View } from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Body, Box, Content, Controls, Icon, SwipContent } from "./styled";

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
	const { removeHabit, completedHabits, completeHabit } =
		useContext(HabitContext);
	const theme = useTheme();

	// Swippeable
	const swipeableRef = useRef<Swipeable>(null);
	const handlePress = () => {
		swipeableRef.current?.close();
		//Remove
		const habitId = id ? id : "";
		removeHabit(habitId);
	};

	const handleCompleteHabit = () => {
		const habitId = id ? id : "";
		completeHabit(habitId);
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

	//Without progress
	const today = moment().startOf("day");
	const idHabit = completedHabits.find((item) => item.habitId === id);
	const isCompleted = idHabit
		? today.isSame(moment(idHabit?.date).startOf("day"))
		: false;

	//with progress
	const progressHabit = requires_goal ? idHabit?.progress : 0;

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
									{`${progressHabit} `}
									<Text style={{ color: theme.colors.disabled }}>
										{`${t("of")} ${goal} ${measure}`}{" "}
									</Text>
								</Text>
							) : (
								<Text variant="body_small">A las {start_time}</Text>
							)}
						</View>

						{requires_goal ? (
							//@ts-ignore
							progressHabit >= goal ? (
								<AntDesign
									name="check"
									size={40}
									color={theme.colors.primary}
								/>
							) : (
								<Controls>
									<TouchableOpacity onPress={handleCompleteHabit}>
										<Entypo name="plus" color="#fff" size={30} />
									</TouchableOpacity>
								</Controls>
							)
						) : isCompleted ? (
							<AntDesign name="check" size={40} color={theme.colors.primary} />
						) : (
							<TouchableOpacity onPress={handleCompleteHabit}>
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
