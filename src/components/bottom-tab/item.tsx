import { Ionicons } from "@expo/vector-icons";
import { useStyled } from "@gluestack-style/react";
import React from "react";
import { ItemBody, Label } from "./styled";

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
	const styled = useStyled();
	const colors = styled.config.tokens.colors;

	return (
		<ItemBody onPress={onPress} isActive={isActive}>
			<Ionicons
				name={icon}
				color={isActive ? colors.background : colors.disabled}
				size={25}
			/>
			<Label isActive={isActive}>{label}</Label>
		</ItemBody>
	);
};
