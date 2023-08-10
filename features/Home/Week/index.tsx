import moment from "moment";
import React from "react";
import { Item } from "./Item";
import { Bar } from "./styled";

export const Week = () => {
	// Obtén el primer día de la semana (lunes) actual
	const startOfWeek = moment().startOf("isoWeek");

	// Crea un array para almacenar las fechas de la semana
	const weekDates = [];

	// Agrega las fechas desde el lunes hasta el domingo
	for (let i = 0; i < 7; i++) {
		weekDates.push(startOfWeek.clone().add(i, "days").format("DD"));
	}

	const progress = 0.75;

	return (
		<Bar>
			<Item text="monday" day={weekDates[0]} progress={0.3} />
			<Item text="tuesday" day={weekDates[1]} progress={0} />
			<Item text="wednesday" day={weekDates[2]} progress={0.2} />
			<Item text="thursday" day={weekDates[3]} progress={0.7} />
			<Item text="friday" day={weekDates[4]} progress={0.8} />
			<Item text="saturday" day={weekDates[5]} progress={1} />
			<Item text="sunday" day={weekDates[6]} progress={0} />
		</Bar>
	);
};
