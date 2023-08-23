import { Text } from "@/components/Text";
import { t } from "i18next";
import { toLower, upperCase } from "lodash";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Item } from "./Item";
import {
	Box,
	DayContent,
	EmptyDayCell,
	Header,
	Icon,
	Row,
	TitleContent,
} from "./styled";

interface Props {
	selectedDay: number;
	setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
	currentMonth: number;
	setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
	currentYear: number;
	setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
}

export const Calendar: React.FC<Props> = ({
	selectedDay,
	setSelectedDay,
	currentMonth,
	setCurrentMonth,
	currentYear,
	setCurrentYear,
}) => {
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const renderDaysHeader = () => {
		const daysOfWeek = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];
		return (
			<Row>
				{daysOfWeek.map((day) => (
					<TitleContent key={day}>
						<Text>{upperCase(day.substring(0, 1))}</Text>
					</TitleContent>
				))}
			</Row>
		);
	};

	const changeMonth = (newMonth: any) => {
		const newDate = new Date(currentYear, newMonth);
		setCurrentMonth(newDate.getMonth());
		setCurrentYear(newDate.getFullYear());
	};

	return (
		<Box>
			<Header>
				<TouchableOpacity onPress={() => changeMonth(currentMonth - 1)}>
					<Icon name="left" />
				</TouchableOpacity>
				<Text variant="subtitle_medium">{`${t(
					toLower(monthNames[currentMonth]),
				)} ${currentYear}`}</Text>
				<TouchableOpacity onPress={() => changeMonth(currentMonth + 1)}>
					<Icon name="right" />
				</TouchableOpacity>
			</Header>

			{renderDaysHeader()}
			<DayContent>
				{Array.from({ length: firstDayOfMonth }, (_, i) => (
					<EmptyDayCell key={`empty-${i}`} />
				))}

				{days.map((day) => (
					<Item
						key={day}
						selectedDay={selectedDay}
						setSelectedDay={setSelectedDay}
						day={day}
						currentMonth={currentMonth}
						currentYear={currentYear}
					/>
				))}
			</DayContent>
		</Box>
	);
};
