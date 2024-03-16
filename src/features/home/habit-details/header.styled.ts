import { styled } from "@gluestack-style/react";
import { View } from "@gluestack-ui/themed";

export const Head = styled(View, {
	w: "100%",
	h: 250,
	borderTopLeftRadius: 30,
	borderTopRightRadius: 30,
	py: 20,
	px: 16,
});

export const Bar = styled(View, {
	w: "100%",
	flexDirection: "row",
	justifyContent: "space-between",
});

export const Circle = styled(View, {
	w: 45,
	h: 45,
	borderRadius: "$full",
	justifyContent: "center",
	alignItems: "center",
	borderWidth: 1,
	borderColor: "$background",
	variants: {
		isActive: {
			true: {
				backgroundColor: "$background",
			},
		},
	},
});
