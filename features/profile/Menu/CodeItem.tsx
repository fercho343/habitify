import { Text } from "@/components/Text";
import { Ionicons } from "@expo/vector-icons";
import {
	WebBrowserPresentationStyle,
	openBrowserAsync,
} from "expo-web-browser";
import { t } from "i18next";
import React from "react";
import { useTheme } from "styled-components/native";
import { IconContent, Row } from "./styled";

export const CodeItem = () => {
	const theme = useTheme();

	const _handlePressButtonAsync = async () => {
		const result = await openBrowserAsync(
			"https://github.com/habitify/habitify",
			{
				presentationStyle: WebBrowserPresentationStyle.FORM_SHEET,
			},
		);
	};

	return (
		<Row onPress={_handlePressButtonAsync}>
			<IconContent>
				<Ionicons name="ios-logo-github" size={25} color={theme.colors.box} />
			</IconContent>
			<Text variant="subtitle_small">{t("code")}</Text>
		</Row>
	);
};
