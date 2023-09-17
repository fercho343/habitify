import { Text } from "@/components/Text";
import { capitalize } from "lodash";
import moment from "moment";
import React from "react";
import { Body } from "./styled";

export const Item: React.FC<JournalType> = ({ id, date, text }) => {
	const getPreviewText = (): string => {
		const content: any = text;
		const newText = content.replace(/<[^>]*>/g, "").slice(0, 100);
		return newText;
	};

	return (
		<Body>
			<Text variant="subtitle_medium" style={{ marginBottom: 10 }}>
				{moment(date).format("MM/DD/YYYY")}
			</Text>
			<Text>{capitalize(getPreviewText())}</Text>
		</Body>
	);
};
