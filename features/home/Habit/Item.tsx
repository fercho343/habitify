import { Text } from "@/components/Text";
import { useHabit } from "@/services/context/HabitContext";
import { Habit } from "@/types/habit";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { t } from "i18next";
import React, { useRef } from "react";
import { Text as TextNative, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import {
	Body,
	Box,
	Content,
	Controls,
	Icon,
	SwipDelete,
	SwipEdit,
} from "./styled";

export const Item: React.FC<Habit> = (item) => {
	const {
		id,
		name,
		description,
		icon,
		color,
		requiresGoal,
		goalAmount,
		measureUnit,
		daysOfWeek,
		hasReminder,
		startTime,
	} = item;
	const theme = useTheme();

	const { removeHabit } = useHabit();

	// Swippeable
	const swipeableRef = useRef<Swipeable>(null);
	const handleDelete = () => {
		removeHabit(id);
		swipeableRef.current?.close();
	};

	const renderLeftActions = () => {
		return (
			<>
				<SwipDelete onPress={handleDelete}>
					<MaterialCommunityIcons name="delete" size={25} color="#fff" />
					<Text variant="body_small" style={{ color: "#fff" }}>
						{t("delete.delete")}
					</Text>
				</SwipDelete>

				<Link
					href={{
						pathname: "/edit-habit",
						// params: { habit: JSON.stringify(item) }
					}}
					asChild
				>
					<SwipEdit onPress={() => swipeableRef.current?.close()}>
						<MaterialCommunityIcons name="pen" size={25} color="#fff" />
						<Text variant="body_small" style={{ color: "#fff" }}>
							{t("edit.edit")}
						</Text>
					</SwipEdit>
				</Link>
			</>
		);
	};

	const progressHabit = 0;
	const isCompleted = false;

	return (
		<Body>
			<Swipeable
				renderRightActions={renderLeftActions}
				overshootRight={false}
				ref={swipeableRef}
			>
				<Box $isOpen={false}>
					<Icon $color={color}>
						<TextNative style={{ fontSize: 30 }}>{icon}</TextNative>
					</Icon>

					<Content>
						<View>
							<Text variant="subtitle_medium" style={{ marginBottom: 5 }}>
								{name}
							</Text>
							{requiresGoal ? (
								<Text variant="body_medium">
									{`${progressHabit} `}
									<Text style={{ color: theme.colors.disabled }}>
										{`${t("of")} ${goalAmount} ${measureUnit}`}{" "}
									</Text>
								</Text>
							) : (
								<Text variant="body_small">A las {startTime}</Text>
							)}
						</View>

						{requiresGoal ? (
							//@ts-ignore
							progressHabit >= goal ? (
								<AntDesign
									name="check"
									size={40}
									color={theme.colors.primary}
								/>
							) : (
								<Controls>
									<TouchableOpacity>
										<Entypo name="plus" color="#fff" size={30} />
									</TouchableOpacity>
								</Controls>
							)
						) : isCompleted ? (
							<AntDesign name="check" size={40} color={theme.colors.primary} />
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
