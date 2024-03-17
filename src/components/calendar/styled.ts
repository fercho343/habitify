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
	rowGap: 5,
	flexWrap: "wrap",
});

export const Item = styled(View, {
	w: "14.28%",
	pb: 10,
	pt: 10,
});

export const Day = styled(Text, {});
