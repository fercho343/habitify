import React from "react";
import { Controller } from "react-hook-form";
import { Switch } from "react-native";
import { useTheme } from "styled-components/native";
import { Text } from "../Text";
import { Row } from "./styled";

interface Props {
	control: any;
	name: string;
	label: string;
}

export const SwichControl: React.FC<Props> = ({ control, name, label }) => {
	const theme = useTheme();
	return (
		<Row>
			<Text variant="subtitle_medium">{label}</Text>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<Switch
						trackColor={{ false: "#767577", true: theme.colors.primary }}
						thumbColor="#f4f3f4"
						ios_backgroundColor="#3e3e3e"
						onValueChange={(value) => onChange(value)}
						value={value}
					/>
				)}
			/>
		</Row>
	);
};
