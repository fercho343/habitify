import { styled } from "@gluestack-style/react";
import { BadgeText } from "@gluestack-ui/themed";
import { View } from "react-native";

export const Bar = styled(View, {
	width: "100%",
	flexDirection: "row",
	justifyContent: "space-between",
	alignItems: "center",
});

export const UserBox = styled(View, {
	flexDirection: "row",
	alignItems: "center",
});

export const UserContent = styled(View, {
	position: "relative",
    mr: 15
});

export const NvText = styled(BadgeText, {
	fontSize: 8,
	fontFamily: "Nabla",
});