import { View } from "@gluestack-ui/themed";
import { NameInput } from "./name.input";
import { Picture } from "./picture";

export const User = () => {
	return (
		<View mb="$5" alignItems="center">
			<Picture />
            <NameInput />
		</View>
	);
};
