import { styled } from "@gluestack-style/react";
import { SafeAreaView } from "react-native-safe-area-context";

export const Layout = styled(SafeAreaView, {
	flex: 1,
	backgroundColor: "$background",
	px: 16,
});
