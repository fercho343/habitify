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
import { TouchableOpacity } from "react-native";

export const Item = () => {
	return (
		<Box mt={10} rounded="$full" backgroundColor="$box" position="relative">
			<Box
				rounded="$full"
				backgroundColor="#6db3dc"
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
						<Text fontSize="$md">Leer un libro</Text>
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
