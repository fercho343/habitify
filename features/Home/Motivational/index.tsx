import { Text } from "@/components/Text";
import React from "react";
import { Box } from "./styled";

export const Motivational = () => {
	return (
		<Box style={{ elevation: 4 }}>
			<Text variant="subtitle_medium">
				No te preocupes por los fracasos, preocúpate por las oportunidades que
				pierdes por temor a fracasar.
			</Text>
		</Box>
	);
};
