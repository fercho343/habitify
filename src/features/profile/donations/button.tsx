import { Pressable } from "@gluestack-ui/themed";
import React, { FC, ReactNode, useState } from "react";
import { GestureResponderEvent } from "react-native";

export const Button: FC<{
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
	children?: ReactNode;
}> = ({ onPress, children }) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	return (
		<Pressable
			states={{ active: isActive }}
			onPressIn={() => setIsActive(true)}
			onPressOut={() => setIsActive(false)}
			onPress={onPress}
			$active-opacity="$50"
		>
			{children}
		</Pressable>
	);
};
