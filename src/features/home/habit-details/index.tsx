import { Calendar } from "@/src/components/calendar";
import { Habit } from "@/src/types/habit";
import { Box } from "@gluestack-ui/themed";
import { FC } from "react";
import { Header } from "./header";
import { ItemCalendar } from "./item-calendar";

interface Props {
	habit: Habit;
}

export const HabitDetails: FC<Props> = ({ habit }) => {

	return (
		<>
			<Header habit={habit} />
			<Box
				sx={{
					mt: -40,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					padding: 16,
					backgroundColor: "$background",
					flex: 1,
				}}
			>
				<Calendar
					renderItem={({ day, key }) => <ItemCalendar key={key} day={day} />}
				/>
			</Box>
		</>
	);
};
