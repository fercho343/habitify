import { useHabit } from "@/src/services/context/habit.context";
import { FlatList } from "react-native";
import { Empty } from "./empty";
import { Item } from "./item";

export const Habits = () => {
	const { habits } = useHabit();
	return (
		<FlatList
			data={habits}
			renderItem={({ item }) => <Item key={item.id} habit={item} />}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			ListEmptyComponent={<Empty />}
			style={{ marginTop: 16 }}
			contentContainerStyle={{
				flexGrow: 1,
			}}
		/>
	);
};
