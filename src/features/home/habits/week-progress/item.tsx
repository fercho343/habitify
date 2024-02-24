import { Frequency } from "@/src/types/habit";
import { useStyled } from "@gluestack-ui/themed";
import { t } from "i18next";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Circle, Svg, Text } from "react-native-svg";
import { Body } from "./styled";

const RADIUS = 22;
const STROKE_WIDTH = 2;

export const Item: React.FC<Props> = ({ day, dayWeek }) => {
	const colors = useStyled().config.tokens.colors;
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
		<Body>
			{/* <GlueText>{t("days.monday").substring(0, 3)}</GlueText> */}

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
					y={RADIUS - 3}
					textAnchor="middle"
					fontSize={12}
					fill="#ffffff"
				>
					{t(`days.${day}`).substring(0, 3)}
				</Text>

				<Text
					x={RADIUS}
					y={RADIUS + 10}
					textAnchor="middle"
					fontSize={12}
					fill="#ffffff"
				>
					{dayWeek.format("DD")}
				</Text>
			</Svg>
		</Body>
	);
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
	day: Frequency;
	dayWeek: Moment;
}
