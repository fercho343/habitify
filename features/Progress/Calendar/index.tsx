import { Text } from "@/components/Text";
import { t } from "i18next";
import moment from "moment";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { Item } from "../Item";
import { Row } from "../Item/styled";
import { Bar, Box, Header, Icon, ItemBody } from "./styled";

export const Calendar = () => {
	const theme = useTheme();
	const [currentDate, setCurrentDate] = useState(moment());

	const goToPreviousMonth = () => {
		setCurrentDate(currentDate.clone().subtract(1, "months"));
	};

	const goToNextMonth = () => {
		setCurrentDate(currentDate.clone().add(1, "months"));
	};

	const renderCalendar = () => {
		const startOfMonth = currentDate.clone().startOf("month");
		const endOfMonth = currentDate.clone().endOf("month");
		const daysInMonth = endOfMonth.diff(startOfMonth, "days") + 1;

		const calendarRows = [];
		let dayCounter = 1;
		const currentDay = startOfMonth.clone();

		for (let week = 0; week < 6; week++) {
			const days = [];

			for (let day = 0; day < 7; day++) {
				if (
					(week === 0 && day < startOfMonth.day()) ||
					dayCounter > daysInMonth
				) {
					days.push(<Text key={`${week}-${day}`} style={{ flex: 1 }} />);
				} else {
					days.push(
						<Item
							key={`${week}-${day}`}
							dayText={currentDay.date()}
							currentDay={currentDay.add(1, "day")}
						/>,
					);
					dayCounter++;
				}
			}

			calendarRows.push(<Row key={week}>{days}</Row>);
		}

		return calendarRows;
	};

	return (
		<Box>
			<Bar>
				<TouchableOpacity onPress={goToPreviousMonth}>
					<Icon name="left" />
				</TouchableOpacity>
				<Text>{currentDate.format("MMMM YYYY")}</Text>
				<TouchableOpacity onPress={goToNextMonth}>
					<Icon name="right" />
				</TouchableOpacity>
			</Bar>
			<Header>
				<ItemBody>
					<Text>{t("monday").substring(0, 1)}</Text>
				</ItemBody>
				<ItemBody>
					<Text>{t("tuesday").substring(0, 1)}</Text>
				</ItemBody>
				<ItemBody>
					<Text>{t("wednesday").substring(0, 1)}</Text>
				</ItemBody>
				<ItemBody>
					<Text>{t("thursday").substring(0, 1)}</Text>
				</ItemBody>
				<ItemBody>
					<Text>{t("friday").substring(0, 1)}</Text>
				</ItemBody>
				<ItemBody>
					<Text>{t("saturday").substring(0, 1)}</Text>
				</ItemBody>
				<ItemBody>
					<Text>{t("sunday").substring(0, 1)}</Text>
				</ItemBody>
			</Header>
			{renderCalendar()}
		</Box>
	);
};
