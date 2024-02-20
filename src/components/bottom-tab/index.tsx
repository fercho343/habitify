import { router } from "expo-router";
import { Item } from "./item";
import { Bar, Content } from "./styled";

//@ts-ignore
export const BottomTab = ({ state }) => {
	return (
		<Bar>
			<Content>
				<Item
					label={"home"}
					icon="home"
					isActive={state.index === 0}
					onPress={() => router.replace("/")}
				/>

				<Item
					label={"progress"}
					icon="bar-chart"
					isActive={state.index === 1}
					onPress={() => router.replace("/progress")}
				/>

				<Item
					label={"progress"}
					icon="person"
					isActive={state.index === 2}
					onPress={() => router.replace("/profile")}
				/>
			</Content>
		</Bar>
	);
};
