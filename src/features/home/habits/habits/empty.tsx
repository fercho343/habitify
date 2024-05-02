import {
    AddIcon,
    Button,
    ButtonIcon,
    ButtonText,
    Text,
    View,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";

export const Empty = () => {
	return (
		<View w="100%" height="85%" justifyContent="center" alignItems="center">
			<Text>{t("empty.habits")}</Text>
			<Button mt="$3" rounded="$full" variant="outline" onPress={() => router.navigate('/add-habit')}>
				<ButtonIcon as={AddIcon} mr="$2" />
				<ButtonText>{t("addHabit")}</ButtonText>
			</Button>
		</View>
	);
};
