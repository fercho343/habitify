import { Box, Text } from "@gluestack-ui/themed";

export const Habit = () => {
	return (
		<Box bg="purple" p={10} rounded="$lg" flexDirection="row">
			<Text fontSize="$md" mr={10}>
				📚
			</Text>
			<Text fontSize="$md">Leer un libro</Text>
		</Box>
	);
};
