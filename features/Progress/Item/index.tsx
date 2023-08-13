import { HabitContext } from "@/services/context/HabitsContext";
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
import { Body } from "./styled";

interface ItemProps {
	dayText: number;
	currentDay: Moment;
}

export const Item = ({ dayText, currentDay }: ItemProps) => {
	const theme = useTheme();
	const radius = 15;
	const strokeWidth = 2;

	const [circumference, setCircumference] = useState(0);

	useEffect(() => {
		const calcCircumference = 2 * Math.PI * radius;
		setCircumference(calcCircumference);
	}, [radius]);

	const date = moment()
		.set({
			date: dayText,
			month: currentDay.month() - 1,
		})
		.startOf("day");

	const { habits, completedHabits } = useContext(HabitContext);
	const totalHabits = habits.length;
	const habitsCompleted = completedHabits.filter((habit) =>
		date.isSame(moment(habit.date).startOf("day")),
	).length;

	const progress = totalHabits > 0 ? habitsCompleted / totalHabits : 0;

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

	return (
		<Body>
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
					stroke={theme.colors.primary}
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
					{dayText}
				</Text>
			</Svg>
		</Body>
	);
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
