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
			<Item day="monday" dayWeek={startOfWeek} />
			<Item day="tuesday" dayWeek={startOfWeek} />
			<Item day="wednesday" dayWeek={startOfWeek} />
			<Item day="thursday" dayWeek={startOfWeek} />
			<Item day="friday" dayWeek={startOfWeek} />
			<Item day="saturday" dayWeek={startOfWeek} />
			<Item day="sunday" dayWeek={startOfWeek} />
		</Bar>
	);
};
