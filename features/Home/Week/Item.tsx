import { Text as StyledText } from "@/components/Text";
import { HabitContext } from "@/services/context/HabitsContext";
import { t } from "i18next";
import { toUpper } from "lodash";
import moment, { Moment } from "moment";
import React, { useContext, useEffect, useState } from "react";
import Animated, {
	Easing,
	useAnimatedProps,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { Circle, Svg, Text } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { ItemBody } from "./styled";

interface Props {
	text: string;
	dayWeek: Moment;
}

export const Item: React.FC<Props> = ({ text, dayWeek }) => {
	const theme = useTheme();
	const radius = 15;
	const strokeWidth = 2;
	const { habits, completedHabits } = useContext(HabitContext);

	const totalHabits = habits.length;
	const habitsCompleted = completedHabits.filter((habit) =>
		dayWeek.isSame(moment(habit.date).startOf("day")),
	).length;

	const progress = totalHabits > 0 ? habitsCompleted / totalHabits : 0;

	const [circumference, setCircumference] = useState(0);

	useEffect(() => {
		const calcCircumference = 2 * Math.PI * radius;
		setCircumference(calcCircumference);
	}, [radius]);

	const progressOffset = (1 - progress) * circumference;
	const animatedProgress = useSharedValue(0);
	animatedProgress.value = withTiming(progress, {
		duration: 1000,
		easing: Easing.ease,
	});

	const animatedProps = useAnimatedProps(() => {
		const progressOffset = (1 - animatedProgress.value) * circumference;
		return {
			strokeDashoffset: progressOffset,
		};
	});

	const today = moment().startOf("day");

	return (
		<>
			<ItemBody>
				<StyledText style={{ textAlign: "center", marginBottom: 10 }}>
					{toUpper(t(text).substring(0, 3))}
				</StyledText>
				<Svg width={radius * 2} height={radius * 2}>
					<Circle
						cx={radius}
						cy={radius}
						r={radius - strokeWidth / 2}
						stroke={theme.colors.disabled}
						strokeWidth={strokeWidth}
					/>
					<AnimatedCircle
						cx={radius}
						cy={radius}
						r={radius - strokeWidth / 2}
						stroke={
							dayWeek.format("DD") === today.format("DD")
								? theme.colors.secondary
								: theme.colors.primary
						}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
						strokeDashoffset={progressOffset}
						animatedProps={animatedProps}
						strokeLinecap="round"
					/>
					<Text
						x={radius}
						y={radius + 4}
						textAnchor="middle"
						fontSize={12}
						fill="#ffffff"
					>
						{dayWeek.format("DD")}
					</Text>
				</Svg>
			</ItemBody>
		</>
	);
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
