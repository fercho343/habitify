import { Text } from "@/components/Text";
import { Entypo } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { useTheme } from "styled-components/native";
import { IconContent, Row } from "./styled";

export const AsyncData = () => {
	const theme = useTheme();

	return (
		<Row>
			<IconContent>
				<Entypo name="database" size={25} color={theme.colors.box} />
			</IconContent>
			<Text variant="subtitle_small">{t("async-data")}</Text>
		</Row>
	);
};
