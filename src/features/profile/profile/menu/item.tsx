import { HStack, Icon, Pressable, Text, View } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { FC, useState } from "react";
import { GestureResponderEvent } from "react-native";

interface PropsItem {
	icon: any;
	text: string;
	to?: string;
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

export const Item: FC<PropsItem> = ({ icon, text, to, onPress }) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	return (
		<Pressable
			states={{ active: isActive }}
			bg="$backgroundLight900"
			rounded="$full"
			mb="$4"
			onPressIn={() => setIsActive(true)}
			onPressOut={() => setIsActive(false)}
			$active-opacity="$50"
			onPress={to ? () => router.navigate(to) : onPress}
		>
			<HStack px="$4" py="$3" alignItems="center">
				<View bg="$primary400" p="$1" rounded="$full">
					<Icon as={icon} color="$backgroundDark950" size="xl" />
				</View>

				<Text size="lg" bold ml="$3">
					{text}
				</Text>
			</HStack>
		</Pressable>
	);
};
