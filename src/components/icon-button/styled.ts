import { styled } from "@gluestack-style/react";
import { View } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

export const Body = styled(View, {
	alignItems: "center",
});

export const Box = styled(TouchableOpacity, {
	w: 45,
	h: 45,
	borderColor: "$box",
	borderWidth: "$2",
	bg: "$box",
	rounded: "$full",
	justifyContent: "center",
	alignItems: "center",
	variants: {
		isInvalid: {
			true: {
				borderColor: "$error400",
			},
		},
	},
});
