import { Text as StyledText } from "@/components/Text";
import { useHabit } from "@/services/context/HabitContext";
import { DayOfWeek, Habit } from "@/types/habit";
import { t } from "i18next";
import { toUpper } from "lodash";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
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
	day: DayOfWeek;
	dayWeek: Moment;
}

const RADIUS = 15;
const STROKE_WIDTH = 2;

export const Item: React.FC<Props> = ({ day, dayWeek }) => {
	const theme = useTheme();
	const [circumference, setCircumference] = useState(0);
	const today = moment().startOf("day");
	const { habits, completedHabits } = useHabit();

	useEffect(() => {
		const calcCircumference = 2 * Math.PI * RADIUS;
		setCircumference(calcCircumference);
	}, []);

	const totalHabits = habits.filter((habit: Habit) =>
		habit.daysOfWeek.includes(day),
	).length;

	const habitsCompleted = completedHabits.filter((completedHabit) =>
		dayWeek
			.startOf("day")
			.isSame(moment(completedHabit.completionDate).startOf("day")),
	).length;

	const progress = totalHabits > 0 ? habitsCompleted / totalHabits : 0;

	const progressOffset = (1 - progress) * circumference;

	const animatedProgress = useSharedValue(0);
	animatedProgress.value = withTiming(progress, {
		duration: 1000,
		easing: Easing.ease,
	});

	const animatedProps = useAnimatedProps(() => {
		const animatedProgressValue = animatedProgress.value;
		const progressOffsetValue = (1 - animatedProgressValue) * circumference;
		return {
			strokeDashoffset: progressOffsetValue,
		};
	});

	return (
		<ItemBody>
			<StyledText style={{ textAlign: "center", marginBottom: 10 }}>
				{toUpper(t(day).substring(0, 3))}
			</StyledText>

			<Svg width={RADIUS * 2} height={RADIUS * 2}>
				<Circle
					cx={RADIUS}
					cy={RADIUS}
					r={RADIUS - STROKE_WIDTH / 2}
					stroke={theme.colors.disabled}
					strokeWidth={STROKE_WIDTH}
				/>
				<AnimatedCircle
					cx={RADIUS}
					cy={RADIUS}
					r={RADIUS - STROKE_WIDTH / 2}
					stroke={
						dayWeek.format("DD") === today.format("DD")
							? theme.colors.secondary
							: theme.colors.primary
					}
					strokeWidth={STROKE_WIDTH}
					strokeDasharray={circumference}
					strokeDashoffset={progressOffset}
					animatedProps={animatedProps}
					strokeLinecap="round"
				/>
				<Text
					x={RADIUS}
					y={RADIUS + 4}
					textAnchor="middle"
					fontSize={12}
					fill="#ffffff"
				>
					{dayWeek.format("DD")}
				</Text>
			</Svg>
		</ItemBody>
	);
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
