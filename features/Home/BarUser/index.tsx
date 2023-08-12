import { Text } from "@/components/Text";
import { ProfileContext } from "@/services/context/ProfileContext";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { t } from "i18next";
import { capitalize } from "lodash";
//@ts-ignore
import moment from "moment/min/moment-with-locales.min.js";
import React, { useContext } from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { Avatar, Bar, IconButton, UserBox } from "./styled";

export const BarUser = () => {
	const theme = useTheme();
	const today = moment();

	const {
		profile: { name, picture },
	} = useContext(ProfileContext);

	return (
		<Bar>
			<UserBox>
				<Avatar
					source={
						picture
							? { uri: picture }
							: require("@/assets/images/no-profile.png")
					}
				/>
				<View>
					<Text variant="subtitle_medium">
						{t("welcome")}, {name}!
					</Text>
					<Text style={{ marginTop: 1 }}>
						{`${t("today")} ${capitalize(
							today.locale("es").format("dddd"),
						)} ${capitalize(today.locale("es").format("MMMM"))} ${today
							.locale("es")
							.format("DD")}`}
					</Text>
				</View>
			</UserBox>
			<Link href="/add-habit" asChild>
				<IconButton>
					<AntDesign name="plus" color={theme.colors.background} size={25} />
				</IconButton>
			</Link>
		</Bar>
	);
};
