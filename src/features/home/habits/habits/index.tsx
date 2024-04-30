import { ScrollView } from "@gluestack-ui/themed";
import { Item } from "./item";

export const Habits = () => {
	return (
		<ScrollView mt="$2">
			<Item />
			<Item />
			<Item />
		</ScrollView>
	);
};
