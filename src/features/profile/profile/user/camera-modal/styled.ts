import { styled } from "@gluestack-style/react";
import { View } from "@gluestack-ui/themed";
import { Camera } from "expo-camera";

export const Body = styled(View, {
	bg: "$backgroundDark900",
	flex: 1,
	px: "$4",
	py: "$4",
});

export const Content = styled(View, {
	w: "80%",
	aspectRatio: 1,
	rounded: "$full",
	overflow: "hidden"
});

export const CameraView = styled(Camera, {
	width: "100%",
	height: "100%",
});
