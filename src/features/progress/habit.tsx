import { HStack, Text } from "@gluestack-ui/themed";

export const Habit = () => {
	return (
		<HStack
			bg="purple"
			p={10}
			rounded="$full"
			flexDirection="row"
			alignItems="center"
		>
			<Text fontSize="$xl" mr={10}>
				📚     
			</Text>
			<Text fontSize="$md">Leer un libro</Text>
		</HStack>
	);
};
