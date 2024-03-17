import { Calendar } from "@/src/components/calendar";
import { Box } from "@gluestack-ui/themed";
import { Header } from "./header";
import { ItemCalendar } from "./item-calendar";

export const HabitDetails = () => {
	return (
		<>
			<Header />
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
