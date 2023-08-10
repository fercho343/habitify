import { Text } from "@/components/Text";
import { AntDesign } from "@expo/vector-icons";
import { t } from "i18next";
import { capitalize } from "lodash";
//@ts-ignore
import moment from "moment/min/moment-with-locales.min.js";
import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { Avatar, Bar, IconButton, UserBox } from "./styled";

export const BarUser = () => {
	const theme = useTheme();
	const today = moment();

	return (
		<Bar>
			<UserBox>
				<Avatar source={require("@/assets/images/no-profile.png")} />
				<View>
					<Text variant="subtitle_medium">{t("welcome")}, Emma!</Text>
					<Text style={{ marginTop: 1 }}>
						{`${t("today")} ${capitalize(
							today.locale("es").format("dddd"),
						)} ${capitalize(today.locale("es").format("MMMM"))} ${today
							.locale("es")
							.format("DD")}`}
					</Text>
				</View>
			</UserBox>

			<IconButton>
				<AntDesign name="plus" color={theme.colors.background} size={25} />
			</IconButton>
		</Bar>
	);
};
