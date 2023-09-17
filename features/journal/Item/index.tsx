import { Text } from "@/components/Text";
import { router } from "expo-router";
import { capitalize } from "lodash";
import moment from "moment";
import React from "react";
import { Body } from "./styled";

export const Item: React.FC<JournalType> = (item) => {
	const { id, text, date } = item;
	const getPreviewText = (): string => {
		const content: any = text;
		const newText = content.replace(/<[^>]*>/g, "").slice(0, 100);
		return newText;
	};

	return (
		<Body
			onPress={() =>
				router.push({
					pathname: "/journal-id",
					params: { item: JSON.stringify(item) },
				})
			}
		>
			<Text style={{ marginBottom: 10 }}>
				{moment(date).format("MM/DD/YYYY")}
			</Text>
			<Text>{capitalize(getPreviewText())}</Text>
		</Body>
	);
};
