import { HStack, Switch as DefaultSwitch, Text } from "@gluestack-ui/themed";

export const Switch: React.FC<Props> = ({ label }) => {
	return (
		<HStack justifyContent="space-between" mb={15}>
			<Text size="lg">{label}</Text>
			<DefaultSwitch />
		</HStack>
	);
};

interface Props {
	label: string;
}
