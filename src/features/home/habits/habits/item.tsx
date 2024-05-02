import { Habit } from "@/src/types/habit";
import {
	Box,
	CheckIcon,
	Checkbox,
	CheckboxIcon,
	CheckboxIndicator,
	HStack,
	Text,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { FC } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
	habit: Habit;
}

export const Item: FC<Props> = ({ habit }) => {
	const { color, name } = habit;
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
					() => router.navigate("/1")
				}
			>
				<HStack
					py={15}
					px={10}
					alignItems="center"
					justifyContent="space-between"
				>
					<HStack alignItems="center">
						<Text fontSize="$xl" mr={10}>
							📚
						</Text>
						<Text
							fontSize="$md"
							color={colorMode === "dark" ? "#000" : "$textDark400"}
						>
							{name}
						</Text>
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

type ColorMode = "light" | "dark";

function getContrastYIQ(hexcolor: string): ColorMode {
	hexcolor = hexcolor.replace("#", "");
	const r = parseInt(hexcolor.substr(0, 2), 16);
	const g = parseInt(hexcolor.substr(2, 2), 16);
	const b = parseInt(hexcolor.substr(4, 2), 16);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? "dark" : "light";
}
