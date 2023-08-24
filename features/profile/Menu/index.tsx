import { Text } from "@/components/Text";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
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

			<Link href="/information" asChild>
				<Row>
					<IconContent>
						<Ionicons name="information" size={25} color={theme.colors.box} />
					</IconContent>
					<Text variant="subtitle_small">{t("information.information")}</Text>
				</Row>
			</Link>

			<Link href="/donations" asChild>
				<Row>
					<IconContent>
						<FontAwesome name="gittip" size={25} color={theme.colors.box} />
					</IconContent>
					<Text variant="subtitle_small">{t("donations")}</Text>
				</Row>
			</Link>

			{/* <Row>
				<IconContent>
					<Ionicons name="ios-logo-github" size={25} color={theme.colors.box} />
				</IconContent>
				<Text variant="subtitle_small">{t("code")}</Text>
			</Row> */}

			<Row>
				<IconContent>
					<Ionicons name="mail" size={25} color={theme.colors.box} />
				</IconContent>
				<Text variant="subtitle_small">{t("contact-us")}</Text>
			</Row>
		</Body>
	);
};
