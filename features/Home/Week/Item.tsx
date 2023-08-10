import { Text as StyledText } from "@/components/Text";
import { t } from "i18next";
import { toUpper } from "lodash";
import React, { useEffect, useState } from "react";
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
					<Circle
						cx={radius}
						cy={radius}
						r={radius - strokeWidth / 2}
						stroke={theme.colors.secondary}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
						strokeDashoffset={progressOffset}
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
