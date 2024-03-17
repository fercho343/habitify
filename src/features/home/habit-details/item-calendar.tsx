import { Day, Item } from "./item-calendar.styled";

interface Props {
	day: number;
}

export const ItemCalendar: React.FC<Props> = ({ day }) => {
	const isActive = Math.floor(Math.random() * 2) > 0 ? true : false;
	return (
		<Item key={day} isActive={isActive}>
			<Day isActive={isActive}>{day}</Day>
		</Item>
	);
};
