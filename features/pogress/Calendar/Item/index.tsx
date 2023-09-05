import { useHabit } from "@/services/context/HabitContext";
import { DayOfWeek, Habit } from "@/types/habit";
import { toLower } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Animated, {
	Easing,
	useAnimatedProps,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { Circle, Svg, Text } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { Body } from "./styled";

interface Props {
	selectedDay: number;
	setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
	day: number;
	currentMonth: number;
	currentYear: number;
}

export const Item: React.FC<Props> = ({
	selectedDay,
	setSelectedDay,
	day,
	currentMonth,
	currentYear,
}) => {
	const theme = useTheme();
	const radius = 15;
	const strokeWidth = 2;

	const today = parseInt(moment().format("DD"));
	const isToday = today === day;

	const [circumference, setCircumference] = useState(0);
	useEffect(() => {
		const calcCircumference = 2 * Math.PI * radius;
		setCircumference(calcCircumference);
	}, [radius]);

	const { habits, completedHabits, completedDays } = useHabit();

	const year = currentYear;
	const month = currentMonth;
	const currentDate = moment({ year, month, day });
	//@ts-ignore
	const nameDay: DayOfWeek = toLower(currentDate.format("dddd"));

	const totalHabits = habits.filter((habit: Habit) =>
		habit.daysOfWeek.includes(nameDay),
	).length;

	const habitsCompleted = completedHabits.filter((completedHabit) =>
		currentDate
			.startOf("day")
			.isSame(moment(completedHabit.completionDate).startOf("day")),
	).length;

	const dayIsCompleted = completedDays.filter((completedDay) =>
		currentDate.startOf("day").isSame(moment(completedDay.date).startOf("day")),
	);

	const progress =
		dayIsCompleted.length > 0
			? 1
			: totalHabits > 0
			? habitsCompleted / totalHabits
			: 0;

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
		<Body onPress={() => setSelectedDay(day)}>
			<Svg width={radius * 2} height={radius * 2}>
				<Circle
					cx={radius}
					cy={radius}
					r={radius - strokeWidth / 2}
					stroke={
						selectedDay === day ? theme.colors.tertiary : theme.colors.disabled
					}
					strokeWidth={strokeWidth}
				/>
				<AnimatedCircle
					cx={radius}
					cy={radius}
					r={radius - strokeWidth / 2}
					stroke={
						selectedDay === day
							? isToday
								? theme.colors.secondary
								: theme.colors.tertiary
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
					{day}
				</Text>
			</Svg>
		</Body>
	);
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
