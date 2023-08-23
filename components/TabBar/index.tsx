import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useTheme } from "styled-components/native";
import { Bar, Item, Label } from "./styled";

//@ts-ignore
export const TabBar = ({ state, descriptors, navigation }) => {
	const theme = useTheme();

	return (
		<Bar>
			<Item
				$isActive={state.index === 0}
				onPress={() => router.replace("/(tabs)")}
			>
				<Ionicons
					name="home"
					color={
						state.index === 0 ? theme.colors.background : theme.colors.disabled
					}
					size={25}
				/>
				<Label $isActive={state.index === 0}>{t("home")}</Label>
			</Item>

			<Item
				$isActive={state.index === 1}
				onPress={() => router.replace("/progress")}
			>
				<Ionicons
					name="bar-chart"
					color={
						state.index === 1 ? theme.colors.background : theme.colors.disabled
					}
					size={25}
				/>
				<Label $isActive={state.index === 1}>{t("progress")}</Label>
			</Item>

			<Item
				$isActive={state.index === 2}
				onPress={() => router.replace("/profile")}
			>
				<Ionicons
					name="person"
					color={
						state.index === 2 ? theme.colors.background : theme.colors.disabled
					}
					size={25}
				/>
				<Label $isActive={state.index === 2}>{t("profile")}</Label>
			</Item>
		</Bar>
	);
};
