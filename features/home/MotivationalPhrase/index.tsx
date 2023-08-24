import { Text } from "@/components/Text";
import phrases_en from "@/constants/phrases/en.json";
import phrases_es from "@/constants/phrases/es.json";
import { getLocales } from "expo-localization";
import moment, { Moment } from "moment";
import React from "react";
import { useTheme } from "styled-components/native";
import { Background, Box } from "./styled";

export const MotivationalPhrase = () => {
	const theme = useTheme();
	const isWhatMoment = getHourToday(moment());
	const dayOfYear = moment().dayOfYear();

	const phraseIndex = ((dayOfYear - 1) % (phrases.length - 1)) + 1;

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
						textShadowColor: "rgb(0, 0, 0)",
						textShadowOffset: { width: -1, height: 1 },
						textShadowRadius: 10,
						textAlign: "center",
					}}
				>
					{phrases[phraseIndex]}
				</Text>
			</Background>
		</Box>
	);
};

const getHourToday = (date: Moment) => {
	const hour = date.hour();

	if (hour < 12) {
		return "morning";
	} else if (hour >= 12 && hour <= 18) {
		return "afternoon";
	} else {
		return "night";
	}
};

const languaje = getLocales()[0].languageCode;

const phrases = languaje === "es" ? phrases_es.phrases : phrases_en.phrases;
