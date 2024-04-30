import { styled } from "@gluestack-style/react";
import { View } from "@gluestack-ui/themed";

export const Body = styled(View, {
	backgroundColor: "$background",
	flex: 1,
	px: 16,
	position: "relative"
});

export const Bar = styled(View, {
	w: "100%",
	flexDirection: "row",
});
