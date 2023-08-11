import { Text } from "@/components/Text";
import moment from "moment";
import React from "react";
import { useTheme } from "styled-components/native";
import { Background, Box } from "./styled";

export const Motivational = () => {
	const theme = useTheme();
	const isWhatMoment = getHourToday(moment());

	console.log(isWhatMoment);

	return (
		<Box style={{ elevation: 4 }}>
			<Background
				source={
					isWhatMoment === "morning"
						? require("@/assets/images/morning.jpg")
						: isWhatMoment === "afternoon"
						? require("@/assets/images/after.jpg")
						: require("@/assets/images/night.jpg")
				}
			>
				<Text
					variant="subtitle_medium"
					style={{
						color: theme.colors.text,
						textShadowColor: "rgba(0, 0, 0, 0.75)",
						textShadowOffset: { width: -1, height: 1 },
						textShadowRadius: 10,
					}}
				>
					No te preocupes por los fracasos, preocúpate por las oportunidades que
					pierdes por temor a fracasar.
				</Text>
			</Background>
		</Box>
	);
};

const getHourToday = (date: any) => {
	const hour = date.hour();
	console.log(hour >= 12 && hour <= 18);

	if (hour < 12) {
		return "morning";
	} else if (hour >= 12 && hour <= 18) {
		return "afternoon";
	} else {
		return "night";
	}
};
