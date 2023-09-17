import { useProfile } from "@/services/context/ProfileContext";
import React from "react";
import { Item } from "./Item";
import { Body } from "./styled";

export const List = () => {
	const { journalEntries } = useProfile();

	return (
		<Body>
			{journalEntries.map((entry) => (
				<Item key={entry.id} {...entry} />
			))}
		</Body>
	);
};
