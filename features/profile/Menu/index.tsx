import { Text } from "@/components/Text";
import { Ionicons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { Link } from "expo-router";
import { t } from "i18next";
import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { AsyncData } from "./AsyncData";
import { CodeItem } from "./CodeItem";
import { Body, IconContent, Row } from "./styled";

export const Menu = () => {
	const theme = useTheme();

	const Email = process.env.EXPO_PUBLIC_MAIL
		? process.env.EXPO_PUBLIC_MAIL
		: "";

	const sendEmail = async () => {
		const isAvaliable = await MailComposer.isAvailableAsync();
		if (isAvaliable) {
			const mail = await MailComposer.composeAsync({
				recipients: [Email],
				body: "",
			});
		}
	};

	return (
		<Body>
			{/* <Row>
				<IconContent>
					<Ionicons name="journal-sharp" size={25} color={theme.colors.box} />
				</IconContent>
				<Text variant="subtitle_small">{t("journal")}</Text>
			</Row> */}

			<Link href="/information" asChild>
				<Row>
					<IconContent>
						<Ionicons name="information" size={25} color={theme.colors.box} />
					</IconContent>
					<Text variant="subtitle_small">{t("information.information")}</Text>
				</Row>
			</Link>

			{/* <Link href="/donations" asChild>
				<Row>
					<IconContent>
						<FontAwesome name="gittip" size={25} color={theme.colors.box} />
					</IconContent>
					<Text variant="subtitle_small">{t("donations")}</Text>
				</Row>
			</Link> */}

			<CodeItem />

			<AsyncData />

			{/* <UpdatItem /> */}

			{Platform.OS === "ios" && (
				<Row onPress={sendEmail}>
					<IconContent>
						<Ionicons name="mail" size={25} color={theme.colors.box} />
					</IconContent>
					<Text variant="subtitle_small">{t("contact-us")}</Text>
				</Row>
			)}
		</Body>
	);
};
