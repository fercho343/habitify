import { Text, View } from "@gluestack-ui/themed";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Background } from "./styled";

interface QuoteType {
	author: string;
	frase: string;
}

export const Phrase = () => {
	const [quote, setQuote] = useState<QuoteType>({
		author: "",
		frase: "",
	});

	const isWhatMoment = getHourToday(moment());

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					"https://apifrases.esmeldy.com/api/frases",
				);
				if (!response.ok) {
					throw new Error("Error al obtener las frases");
				}
				const data = await response.json();
				const index = Math.floor(Math.random() * data.length);
				setQuote({
					author: data[index].autor,
					frase: data[index].frase,
				});
			} catch (error) {
				// Manejo de errores en caso de que la petición falle
				console.error("Error al obtener las frases:", error);
			}
		})();
	}, []);

	return (
		<View w="100%" aspectRatio={16 / 8} mt="$3" rounded="$md" overflow="hidden">
			<Background
				source={
					isWhatMoment === "morning"
						? require("@/assets/images/morning.jpg")
						: isWhatMoment === "afternoon"
						  ? require("@/assets/images/after.jpg")
						  : require("@/assets/images/night.jpg")
				}
			>
				<View
					w="100%"
					h="100%"
					alignItems="center"
					justifyContent="center"
					px="$2"
					py="$3"
				>
					<Text
						size="lg"
						style={{
							textShadowColor: "rgb(0, 0, 0)",
							textShadowOffset: { width: -1, height: 1 },
							textShadowRadius: 10,
							textAlign: "center",
						}}
					>
						{quote.frase}
					</Text>
					<Text size="sm">- {quote.author}</Text>
				</View>
			</Background>
		</View>
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
