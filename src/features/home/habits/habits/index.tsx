import { useHabit } from "@/src/services/context/habit.context";
import { View } from "@gluestack-ui/themed";
import moment from "moment";
import { FlatList } from "react-native";
import { Empty } from "./empty";
import { Item } from "./item";

export const Habits = () => {
	const { habits } = useHabit();

	const sortedHabits = habits.sort((habitA, habitB) => {
		const startTimeA = moment(habitA.startTime, "hh:mm A");
		const startTimeB = moment(habitB.startTime, "hh:mm A");
		return startTimeA.isBefore(startTimeB) ? -1 : 1;
	});

	return (
		<View mt="$3" flex={1}>
			<FlatList
				data={sortedHabits}
				renderItem={({ item }) => <Item key={item.id} habit={item} />}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={<Empty />}
				contentContainerStyle={{
					flexGrow: 1,
				}}
			/>
		</View>
	);
};
