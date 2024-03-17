import { styled } from "@gluestack-style/react";
import { Text, View } from "@gluestack-ui/themed";

export const Body = styled(View, {
	w: "100%",
});

export const Header = styled(View, {
	w: "100%",
	flexDirection: "row",
	justifyContent: "space-between",
	alignItems: "center",
});

export const Box = styled(View, {
	w: "100%",
	flexDirection: "row",
	justifyContent: "space-between",
	rowGap: 5,
	flexWrap: "wrap",
});

export const Item = styled(View, {
	w: "13%",
	pb: 10,
	pt: 10,
});

export const Day = styled(Text, {
	variants: {
		isActive: {
			true: { color: "$background" },
		},
	},
});
