import { Text } from "@/components/Text";
import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { useTheme } from "styled-components/native";
import { IconContent, Row } from "./styled";

export const DownloadItem = () => {
	const theme = useTheme();

	return (
		<Row>
			<IconContent>
				<Ionicons
					name="ios-cloud-download"
					size={25}
					color={theme.colors.box}
				/>
			</IconContent>
			<Text variant="subtitle_small">{t("download-data")}</Text>
		</Row>
	);
};
