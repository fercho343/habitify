import { Text } from "@/components/Text";
import React from "react";
import { Row } from "./styled";

interface Props {
	title: string;
	description: string;
}

export const Item: React.FC<Props> = ({ title, description }) => {
	return (
		<Row>
			<Text variant="subtitle_medium">{title}</Text>
			<Text>{description}</Text>
		</Row>
	);
};
