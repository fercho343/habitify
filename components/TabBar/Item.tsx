import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "styled-components/native";
import { ItemBody, Label } from "./styled";

type StateType = {
	index: number;
};

interface ItemProps {
	label: string;
	icon: React.ComponentProps<typeof Ionicons>["name"];
	isActive: boolean;
	onPress: () => void;
}

export const Item: React.FC<ItemProps> = ({
	label,
	icon,
	isActive,
	onPress,
}) => {
	const theme = useTheme();
	return (
		<ItemBody
			$isActive={isActive}
			onPress={onPress}
			style={
				isActive && {
					shadowColor: theme.colors.primary,
					shadowOffset: {
						width: 0,
						height: 12,
					},
					shadowOpacity: 0.58,
					shadowRadius: 16.0,
				}
			}
		>
			<Ionicons
				name={icon}
				color={isActive ? theme.colors.background : theme.colors.disabled}
				size={25}
			/>
			<Label $isActive={isActive}>{label}</Label>
		</ItemBody>
	);
};
