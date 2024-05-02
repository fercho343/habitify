import { Habit } from "@/src/types/habit";
import { getContrastYIQ } from "@/src/utils/getContsastYIQ";
import {
	Box,
	CheckIcon,
	Checkbox,
	CheckboxIcon,
	CheckboxIndicator,
	HStack,
	Text,
	View,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { FC } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
	habit: Habit;
}

export const Item: FC<Props> = ({ habit }) => {
	const { id, color, name, icon, startTime } = habit;
	const colorMode = getContrastYIQ(color);

	return (
		<Box mt={10} rounded="$full" backgroundColor="$box" position="relative">
			<Box
				rounded="$full"
				backgroundColor={color}
				w="100%"
				h="100%"
				position="absolute"
			/>
			<TouchableOpacity
				onPress={
					//@ts-ignore
					() =>
						router.navigate({
							pathname: `/${id}`,
							params: { habit: JSON.stringify(habit) },
						})
				}
			>
				<HStack
					py="$2"
					px="$2"
					alignItems="center"
					justifyContent="space-between"
				>
					<HStack alignItems="center">
						<View
							w={40}
							h={40}
							rounded="$full"
							bg="$background"
							alignItems="center"
							justifyContent="center"
							mr="$3"
						>
							<Text fontSize="$xl">{icon}</Text>
						</View>

						<View>
							<Text
								fontSize="$md"
								color={colorMode === "dark" ? "#000" : "$textDark400"}
							>
								{name}
							</Text>
							<Text
								size="xs"
								color={colorMode === "dark" ? "#000" : "$textDark400"}
							>
								{startTime}
							</Text>
						</View>
					</HStack>

					<Checkbox
						value=""
						size="lg"
						isInvalid={false}
						isDisabled={false}
						// isChecked={true}
						aria-label="complete"
					>
						<CheckboxIndicator mr="$2" rounded="$full">
							<CheckboxIcon as={CheckIcon} />
						</CheckboxIndicator>
					</Checkbox>
				</HStack>
			</TouchableOpacity>
		</Box>
	);
};
