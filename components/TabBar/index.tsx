import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { Item } from "./Item";
import { Bar, Content } from "./styled";

//@ts-ignore
export const TabBar = ({ state }) => {
	return (
		<Bar>
			<Content>
				<Item
					label={t("home")}
					icon="home"
					isActive={state.index === 0}
					onPress={() => router.replace("/")}
				/>

				<Item
					label={t("progress")}
					icon="bar-chart"
					isActive={state.index === 1}
					onPress={() => router.replace("/progress")}
				/>

				<Item
					label={t("progress")}
					icon="person"
					isActive={state.index === 2}
					onPress={() => router.replace("/profile")}
				/>
			</Content>
		</Bar>
	);
};
