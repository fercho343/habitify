import { useStyled } from "@gluestack-style/react";
import moment from "moment";
import { useEffect, useState } from "react";
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Circle, Svg, Text } from "react-native-svg";
import { Item } from "./day-item.styled";

interface Props {
	day: number;
}

const RADIUS = 16;
const STROKE_WIDTH = 2;

export const DayItem: React.FC<Props> = ({ day }) => {
	const colors = useStyled().config.tokens.colors;
	const today = moment().startOf("day");

	const [circumference, setCircumference] = useState<number>(0);

	useEffect(() => {
		const calcCircumference = 2 * Math.PI * RADIUS;
		setCircumference(calcCircumference);
	}, []);

	const totalHabits = 10;
	const totalHabitsComplete = Math.floor(Math.random() * 10) + 1;

	const progress = totalHabitsComplete / totalHabits;
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
		<Item>
			<Svg width={RADIUS * 2} height={RADIUS * 2}>
				<Circle
					cx={RADIUS}
					cy={RADIUS}
					r={RADIUS - STROKE_WIDTH / 2}
					stroke={colors.disabled}
					strokeWidth={STROKE_WIDTH}
				/>
				<AnimatedCircle
					cx={RADIUS}
					cy={RADIUS}
					r={RADIUS - STROKE_WIDTH / 2}
					stroke={colors.primary400}
					strokeWidth={STROKE_WIDTH}
					strokeDasharray={circumference}
					strokeDashoffset={progressOffset}
					animatedProps={animatedProps}
					strokeLinecap="round"
				/>

				<Text
					x={RADIUS}
					y={RADIUS + 5}
					textAnchor="middle"
					fontSize={12}
					fill="#ffffff"
				>
					{day}
				</Text>
			</Svg>
		</Item>
	);
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
