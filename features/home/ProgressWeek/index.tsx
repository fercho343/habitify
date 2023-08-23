import moment from "moment";
import React from "react";
import { Item } from "./Item";
import { Bar } from "./styled";

export const ProgressWeek = () => {
	const startOfWeek = moment().startOf("isoWeek");
	const weekDates = [];
	for (let i = 0; i < 7; i++) {
		weekDates.push(startOfWeek.clone().add(i, "days"));
	}

	return (
		<Bar>
			<Item day="monday" dayWeek={weekDates[0]} />
			<Item day="tuesday" dayWeek={weekDates[1]} />
			<Item day="wednesday" dayWeek={weekDates[2]} />
			<Item day="thursday" dayWeek={weekDates[3]} />
			<Item day="friday" dayWeek={weekDates[4]} />
			<Item day="saturday" dayWeek={weekDates[5]} />
			<Item day="sunday" dayWeek={weekDates[6]} />
		</Bar>
	);
};
