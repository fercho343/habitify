import { styled } from "@gluestack-style/react";
import { Text, View } from "@gluestack-ui/themed";

export const Item = styled(View, {
	w: "13%",
	aspectRatio: 1,
	alignItems: "center",
	justifyContent: "center",
	pb: 10,
	pt: 10,
	rounded: "$full",
	variants: {
		isActive: {
			true: { backgroundColor: "$primary400" },
		},
	},
});

export const Day = styled(Text, {
	variants: {
		isActive: {
			true: { color: "$background" },
		},
	},
});
