import { View } from "@gluestack-ui/themed";
import { Menu } from "./menu";
import { User } from "./user";

export const Profile = () => {
	return (
		<View flex={1}>
			<User />
			<Menu />
		</View>
	);
};
