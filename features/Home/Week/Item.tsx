import { Text as StyledText } from "@/components/Text";
import { t } from "i18next";
import { toUpper } from "lodash";
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
import { ItemBody } from "./styled";

interface Props {
	text: string;
	day: string;
	progress: number;
}

export const Item: React.FC<Props> = ({ text, day, progress }) => {
	const theme = useTheme();
	const radius = 15;
	const strokeWidth = 2;

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

	const today = moment().format("DD");

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
							day === today ? theme.colors.secondary : theme.colors.primary
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
			</ItemBody>
		</>
	);
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
