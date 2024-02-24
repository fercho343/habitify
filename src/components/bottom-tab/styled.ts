import { styled } from "@gluestack-style/react";
import { View } from "@gluestack-ui/themed";
import { BlurView } from "expo-blur";
import { Text, TouchableOpacity } from "react-native";

export const Bar = styled(View, {
	width: "95%",
	height: 60,
	position: "absolute",
	alignSelf: "center",
	borderRadius: 50,
});

export const Content = styled(BlurView, {
	width: "100%",
	height: "100%",
	borderRadius: 50,
	overflow: "hidden",
	flexDirection: "row",
	alignItems: "center",
	paddingHorizontal: 16,
	justifyContent: "space-between",
});

export const ItemBody = styled(TouchableOpacity, {
	bg: "transparent",
	borderRadius: 50,
	paddingVertical: 5,
	paddingHorizontal: 10,
	flexDirection: "row",
	alignItems: "center",
	width: "33.3%",
	justifyContent: "center",
	variants: {
		isActive: {
			true: {
				bg: "$primary400",
				shadowColor: "$primary300",
				shadowOffset: {
					width: 0,
					height: 12,
				},
				shadowOpacity: 0.58,
				shadowRadius: 16.0,
			},
		},
	},
});

export const Label = styled(Text, {
	display: "none",
	ml: 5,
	variants: {
		isActive: {
			true: {
				display: "flex",
				fontFamily: "MacPawSemiBold",
			},
		},
	},
});
