import moment from "moment";
import React from "react";
import { Item } from "./Item";
import { Bar } from "./styled";

export const Week = () => {
	const startOfWeek = moment().startOf("isoWeek");
	const weekDates = [];
	for (let i = 0; i < 7; i++) {
		weekDates.push(startOfWeek.clone().add(i, "days"));
	}

	return (
		<Bar>
			<Item text="monday" dayWeek={weekDates[0]} />
			<Item text="tuesday" dayWeek={weekDates[1]} />
			<Item text="wednesday" dayWeek={weekDates[2]} />
			<Item text="thursday" dayWeek={weekDates[3]} />
			<Item text="friday" dayWeek={weekDates[4]} />
			<Item text="saturday" dayWeek={weekDates[5]} />
			<Item text="sunday" dayWeek={weekDates[6]} />
		</Bar>
	);
};
