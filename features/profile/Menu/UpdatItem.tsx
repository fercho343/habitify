import { Text } from "@/components/Text";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import * as Updates from "expo-updates";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components/native";
import { Content, IconContent, Point, Row, Status } from "./styled";

export const UpdatItem = () => {
	const [haveUpdate, setUpdate] = useState<boolean>(false);
	const theme = useTheme();
	const url = Linking.useURL();

	useEffect(() => {
		(async () => {
			try {
				const update = await Updates.checkForUpdateAsync();
				setUpdate(update.isAvailable);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const showAlert = () => alert(url);

	// async function onFetchUpdateAsync() {
	// 	try {
	// 		const update = await Updates.checkForUpdateAsync();
	// 		alert("Ejecutabdo");
	// 		alert(`${update.isAvailable}`);

	// 		if (update.isAvailable) {
	// 			await Updates.fetchUpdateAsync();
	// 			await Updates.reloadAsync();
	// 		}
	// 	} catch (error) {
	// 		// You can also add an alert() to see the error message in case of an error when fetching updates.
	// 		alert(`Error fetching latest Expo update: ${error}`);
	// 	}
	// }

	return (
		<Content>
			<Row>
				<IconContent>
					<MaterialIcons name="update" size={25} color={theme.colors.box} />
				</IconContent>
				<Text variant="subtitle_small">{t("new-update")}</Text>
			</Row>

			<Point>
				<Status $haveUpdate={haveUpdate} />
			</Point>
		</Content>
	);
};
