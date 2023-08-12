import { TouchableOpacity } from "react-native";
import { NameInput } from "./NameInput";
import { Avatar, Head } from "./styled";

export const Header = () => {
	return (
		<Head>
			<TouchableOpacity>
				<Avatar
					source={require("@/assets/images/no-profile.png")}
					transition={0}
				/>
			</TouchableOpacity>
			<NameInput name="Samantha" />
		</Head>
	);
};
