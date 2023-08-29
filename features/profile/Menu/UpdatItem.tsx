import { Text } from "@/components/Text";
import { MaterialIcons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import React from "react";
import { useTheme } from "styled-components/native";
import { IconContent, Row } from "./styled";

export const UpdatItem = () => {
	const theme = useTheme();

	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync();

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
		} catch (error) {
			// You can also add an alert() to see the error message in case of an error when fetching updates.
			alert(`Error fetching latest Expo update: ${error}`);
		}
	}

	return (
		<Row onPress={onFetchUpdateAsync}>
			<IconContent>
				<MaterialIcons name="update" size={25} color={theme.colors.box} />
			</IconContent>
			<Text variant="subtitle_small">Expo Update</Text>
		</Row>
	);
};
