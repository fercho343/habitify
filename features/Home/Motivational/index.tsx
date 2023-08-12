import { Text } from "@/components/Text";
import moment from "moment";
import React from "react";
import { useTheme } from "styled-components/native";
import { Background, Box } from "./styled";

export const Motivational = () => {
	const theme = useTheme();
	const isWhatMoment = getHourToday(moment());

	const randomNumber = Math.floor(Math.random() * 78);

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
						textAlign: "center",
					}}
				>
					{phrases[randomNumber].phrase}
				</Text>
			</Background>
		</Box>
	);
};

const getHourToday = (date: any) => {
	const hour = date.hour();

	if (hour < 12) {
		return "morning";
	} else if (hour >= 12 && hour <= 18) {
		return "afternoon";
	} else {
		return "night";
	}
};

const phrases = [
	{
		phrase: "Cada pequeño paso te acerca más a grandes logros.",
	},
	{
		phrase: "El éxito es el resultado de la constancia en el esfuerzo diario.",
	},
	{
		phrase: "La disciplina es el puente entre tus metas y tus logros.",
	},
	{
		phrase:
			"No importa cuántas veces caigas, levántate con más fuerza cada vez.",
	},
	{
		phrase: "Los obstáculos son oportunidades para crecer y superarse.",
	},
	{
		phrase: "Hoy es el día perfecto para comenzar a construir tus sueños.",
	},
	{
		phrase:
			"El progreso es la suma de pequeños esfuerzos repetidos día tras día.",
	},
	{
		phrase:
			"Cada nuevo día es una página en blanco, escribe una historia de éxito.",
	},
	{
		phrase:
			"Las mejores cosas de la vida vienen de salir de tu zona de confort.",
	},
	{
		phrase:
			"No te compares con otros, compite contigo mismo para ser mejor cada día.",
	},
	{
		phrase: "El secreto del éxito es comenzar antes de estar listo.",
	},
	{
		phrase: "El tiempo que dedicas a mejorar no se desperdicia nunca.",
	},
	{
		phrase: "Las metas audaces requieren acciones audaces.",
	},
	{
		phrase: "La perseverancia es la llave que abre la puerta del éxito.",
	},
	{
		phrase: "Confía en ti mismo y llegarás más lejos de lo que imaginas.",
	},
	{
		phrase: "Las dificultades son oportunidades disfrazadas.",
	},
	{
		phrase: "Cada día es una nueva oportunidad para cambiar tu vida.",
	},
	{
		phrase:
			"El éxito no es un destino, es un viaje de constancia y determinación.",
	},
	{
		phrase:
			"Haz hoy lo que otros no están dispuestos a hacer para tener mañana lo que otros no tendrán.",
	},
	{
		phrase: "No tengas miedo de fallar, ten miedo de no intentarlo.",
	},
	{
		phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
	},
	{
		phrase: "Si te caes siete veces, levántate ocho.",
	},
	{
		phrase:
			"Las dificultades preparan a personas comunes para destinos extraordinarios.",
	},
	{
		phrase: "Lo que te desafía, te cambia.",
	},
	{
		phrase: "El mayor error que puedes cometer es tener miedo de cometer uno.",
	},
	{
		phrase:
			"No esperes a que el momento sea perfecto; toma el momento y hazlo perfecto.",
	},
	{
		phrase: "Cada día es una nueva oportunidad para mejorar.",
	},
	{
		phrase:
			"El fracaso es solo una oportunidad para empezar de nuevo con más inteligencia.",
	},
	{
		phrase: "Tus sueños son el combustible que te impulsa a seguir adelante.",
	},
	{
		phrase: "La única manera de hacer un gran trabajo es amar lo que haces.",
	},
	{
		phrase:
			"El éxito no es el resultado de un golpe de suerte, es el resultado de esfuerzo y perseverancia.",
	},
	{
		phrase: "No mires atrás, no vas en esa dirección.",
	},
	{
		phrase:
			"Las excusas te impiden progresar, la acción te lleva hacia adelante.",
	},
	{
		phrase: "Cree en ti mismo y estarás a medio camino del éxito.",
	},
	{
		phrase: "Las dificultades son oportunidades disfrazadas.",
	},
	{
		phrase: "Cada día es una nueva oportunidad para cambiar tu vida.",
	},
	{
		phrase:
			"El éxito no es un destino, es un viaje de constancia y determinación.",
	},
	{
		phrase:
			"Haz hoy lo que otros no están dispuestos a hacer para tener mañana lo que otros no tendrán.",
	},
	{
		phrase: "No tengas miedo de fallar, ten miedo de no intentarlo.",
	},
	{
		phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
	},
	{
		phrase: "Si te caes siete veces, levántate ocho.",
	},
	{
		phrase:
			"Las dificultades preparan a personas comunes para destinos extraordinarios.",
	},
	{
		phrase: "Lo que te desafía, te cambia.",
	},
	{
		phrase: "El mayor error que puedes cometer es tener miedo de cometer uno.",
	},
	{
		phrase:
			"No esperes a que el momento sea perfecto; toma el momento y hazlo perfecto.",
	},
	{
		phrase: "Cada día es una nueva oportunidad para mejorar.",
	},
	{
		phrase:
			"El fracaso es solo una oportunidad para empezar de nuevo con más inteligencia.",
	},
	{
		phrase: "Tus sueños son el combustible que te impulsa a seguir adelante.",
	},
	{
		phrase: "La única manera de hacer un gran trabajo es amar lo que haces.",
	},
	{
		phrase:
			"El éxito no es el resultado de un golpe de suerte, es el resultado de esfuerzo y perseverancia.",
	},
	{
		phrase: "No mires atrás, no vas en esa dirección.",
	},
	{
		phrase:
			"Las excusas te impiden progresar, la acción te lleva hacia adelante.",
	},
	{
		phrase: "Cree en ti mismo y estarás a medio camino del éxito.",
	},
	{
		phrase: "Las dificultades son oportunidades disfrazadas.",
	},
	{
		phrase: "Cada día es una nueva oportunidad para cambiar tu vida.",
	},
	{
		phrase:
			"El éxito no es un destino, es un viaje de constancia y determinación.",
	},
	{
		phrase:
			"Haz hoy lo que otros no están dispuestos a hacer para tener mañana lo que otros no tendrán.",
	},
	{
		phrase: "No tengas miedo de fallar, ten miedo de no intentarlo.",
	},
	{
		phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
	},
	{
		phrase: "Si te caes siete veces, levántate ocho.",
	},
	{
		phrase:
			"Las dificultades preparan a personas comunes para destinos extraordinarios.",
	},
	{
		phrase: "Lo que te desafía, te cambia.",
	},
	{
		phrase: "El mayor error que puedes cometer es tener miedo de cometer uno.",
	},
	{
		phrase:
			"No esperes a que el momento sea perfecto; toma el momento y hazlo perfecto.",
	},
	{
		phrase: "Cada día es una nueva oportunidad para mejorar.",
	},
	{
		phrase:
			"El fracaso es solo una oportunidad para empezar de nuevo con más inteligencia.",
	},
	{
		phrase: "Tus sueños son el combustible que te impulsa a seguir adelante.",
	},
	{
		phrase: "La única manera de hacer un gran trabajo es amar lo que haces.",
	},
	{
		phrase:
			"El éxito no es el resultado de un golpe de suerte, es el resultado de esfuerzo y perseverancia.",
	},
	{
		phrase: "No mires atrás, no vas en esa dirección.",
	},
	{
		phrase:
			"Las excusas te impiden progresar, la acción te lleva hacia adelante.",
	},
	{
		phrase: "Cree en ti mismo y estarás a medio camino del éxito.",
	},
	{
		phrase: "Las dificultades son oportunidades disfrazadas.",
	},
	{
		phrase: "Cada día es una nueva oportunidad para cambiar tu vida.",
	},
	{
		phrase:
			"El éxito no es un destino, es un viaje de constancia y determinación.",
	},
	{
		phrase:
			"Haz hoy lo que otros no están dispuestos a hacer para tener mañana lo que otros no tendrán.",
	},
	{
		phrase: "No tengas miedo de fallar, ten miedo de no intentarlo.",
	},
	// ... aquí puedes seguir agregando más frases motivacionales
];
