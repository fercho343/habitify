import { Text } from "@/components/Text";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { useTheme } from "styled-components/native";
import { Body, IconContent, Row } from "./styled";

export const Menu = () => {
	const theme = useTheme();
	return (
		<Body>
			<Row>
				<IconContent>
					<Ionicons name="journal-sharp" size={25} color={theme.colors.box} />
				</IconContent>
				<Text variant="subtitle_small">{t("journal")}</Text>
			</Row>

			<Row>
				<IconContent>
					<FontAwesome name="gittip" size={25} color={theme.colors.box} />
				</IconContent>
				<Text variant="subtitle_small">{t("donations")}</Text>
			</Row>

			<Row>
				<IconContent>
					<Ionicons name="ios-logo-github" size={25} color={theme.colors.box} />
				</IconContent>
				<Text variant="subtitle_small">{t("code")}</Text>
			</Row>

			<Row>
				<IconContent>
					<Ionicons name="mail" size={25} color={theme.colors.box} />
				</IconContent>
				<Text variant="subtitle_small">{t("contact-us")}</Text>
			</Row>
		</Body>
	);
};
