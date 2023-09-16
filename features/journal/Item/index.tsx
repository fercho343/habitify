import { Text } from "@/components/Text";
import React from "react";
import { Body } from "./styled";

export const Item = () => {
	const text =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, voluptas mollitia error iusto voluptates et iure, sint ea earum totam, rem cum culpa odio dolorum molestiae atque enim itaque placeat!";
	return (
		<Body>
			<Text variant="subtitle_medium">23 de noviembre del 2023</Text>
			<Text>{text}</Text>
		</Body>
	);
};
