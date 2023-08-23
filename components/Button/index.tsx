import React from "react";
import { useTheme } from "styled-components/native";
import { Text } from "../Text";
import { ButtonContent } from "./styled";

interface Props {
	onPress?: () => void;
	children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ onPress, children }) => {
	const theme = useTheme();
	return (
		<ButtonContent onPress={onPress}>
			<Text variant="body_large" style={{ color: theme.colors.background }}>
				{children}
			</Text>
		</ButtonContent>
	);
};
