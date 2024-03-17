import {
    Button,
    ButtonIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    HStack,
    Text,
    View,
} from "@gluestack-ui/themed";
import { t } from "i18next";
import { upperCase } from "lodash";
import { useState } from "react";
import { Body, Box, Header, Item } from "./styled";

interface Props {
	renderItem: (props: {
		day: number;
		key: number;
	}) => JSX.Element;
}

export const Calendar: React.FC<Props> = ({ renderItem }) => {
	const today = new Date();
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [currentYear, setCurrentYear] = useState(today.getFullYear());

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	const monthNames = [
		"january",
		"february",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december",
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
			<HStack mt={15}>
				{daysOfWeek.map((day) => (
					<View key={day} w="14.28%" alignItems="center">
						<Text>{upperCase(day.substring(0, 1))}</Text>
					</View>
				))}
			</HStack>
		);
	};

	const changeMonth = (newMonth: any) => {
		const newDate = new Date(currentYear, newMonth);
		setCurrentMonth(newDate.getMonth());
		setCurrentYear(newDate.getFullYear());
	};

	return (
		<Body>
			<Header>
				<Button
					w={45}
					h={45}
					rounded="$full"
					variant="solid"
					bg="$box"
					sx={{
						":active": {
							opacity: 0.6,
						},
					}}
					onPress={() => changeMonth(currentMonth - 1)}
				>
					<ButtonIcon as={ChevronLeftIcon} />
				</Button>

				<Text size="xl">{`${t(
					`months.${monthNames[currentMonth]}`,
				)} ${currentYear}`}</Text>

				<Button
					w={45}
					h={45}
					rounded="$full"
					variant="solid"
					bg="$box"
					sx={{
						":active": {
							opacity: 0.6,
						},
					}}
					onPress={() => changeMonth(currentMonth + 1)}
				>
					<ButtonIcon as={ChevronRightIcon} />
				</Button>
			</Header>

			{renderDaysHeader()}
			<Box>
				{Array.from({ length: firstDayOfMonth }, (_, i) => (
					<Item key={`empty-${i}`} />
				))}

				{days.map((day, index) => {
					return renderItem({ day, key: index });
				})}
			</Box>
		</Body>
	);
};
