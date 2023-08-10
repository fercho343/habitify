import React from "react";
import { Avatar, Bar, UserBox } from "./styled";

export const BarUser = () => {
	return (
		<Bar>
			<UserBox>
				<Avatar source={require("@/assets/images/no-profile.png")} />
			</UserBox>
		</Bar>
	);
};
