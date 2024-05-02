import { Heading, Text, View } from "@gluestack-ui/themed";
import React, { FC } from "react";

interface Props {
	day: string;
	hour: string;
	subject: string;
}

export const Item: FC<Props> = ({ day, hour, subject }) => {
	return (
		<View>
			<Heading size="md">{day}</Heading>
			<View>
				<Text numberOfLines={1}>{`${hour} - ${subject}`}</Text>
			</View>
		</View>
	);
};
