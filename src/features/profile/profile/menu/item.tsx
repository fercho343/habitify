import { HStack, Icon, Pressable, Text, View } from "@gluestack-ui/themed";
import { FC, useState } from "react";

interface PropsItem {
	icon: any;
	text: string;
}

export const Item: FC<PropsItem> = ({ icon, text }) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	return (
		<Pressable
			states={{ active: isActive }}
			bg="$backgroundLight900"
			rounded="$full"
			onPressIn={() => setIsActive(true)}
			onPressOut={() => setIsActive(false)}
			$active-opacity="$50"
			mb="$4"
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
