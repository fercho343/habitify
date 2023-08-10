import { Text } from "@/components/Text";
import React from "react";
import { IconButton } from "./styled";

interface Props {
	text: string;
	onChange: (text: string) => void;
}

export const Button = ({ text, onChange }: Props) => {
	return (
		<IconButton onPress={() => onChange(text)}>
			<Text variant="subtitle_medium">{text}</Text>
		</IconButton>
	);
};
