import { useHabit } from "@/src/services/context/habit.context";
import { ScrollView } from "@gluestack-ui/themed";
import { Item } from "./item";

export const Habits = () => {
	const { habits } = useHabit();
	return (
		<ScrollView mt="$2">
			{
				habits.map((habit) => (
                    <Item key={habit.id} habit={habit} />
                ))
			}
			
		</ScrollView>
	);
};
