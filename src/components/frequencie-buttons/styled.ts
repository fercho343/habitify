import { styled } from "@gluestack-style/react";
import { TouchableOpacity } from "react-native";

export const Button = styled(TouchableOpacity, {
	w: 45,
	h: 45,
	borderRadius: "$full",
	opacity: 0.5,
	bg: "$box",
    justifyContent: 'center',
    alignItems: 'center',
	variants: {
		isActive: {
			true: {
				opacity: 1,
			},
		},
	},
});
