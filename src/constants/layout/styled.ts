import { styled } from "@gluestack-style/react";
import { View } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

export const Body = styled(SafeAreaView, {
	backgroundColor: "$background",
	flex: 1,
	px: 16,
});

export const Bar = styled(View, {
	w: "100%",
	flexDirection: "row",
});
