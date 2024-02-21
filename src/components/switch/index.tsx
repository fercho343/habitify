import { HStack, Switch as DefaultSwitch, Text } from "@gluestack-ui/themed";
import { Control, Controller } from "react-hook-form";

export const Switch: React.FC<Props> = ({ label, name, control }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange } }) => (
				<HStack justifyContent="space-between" mb={15}>
					<Text size="lg">{label}</Text>
					<DefaultSwitch
						value={value}
						onToggle={(value) => onChange(value)}
					/>
				</HStack>
			)}
		/>

		// <HStack justifyContent="space-between" mb={15}>
		// 	<Text size="lg">{label}</Text>
		// 	<DefaultSwitch />
		// </HStack>
	);
};

interface Props {
	control: Control<any>;
	name: string;
	label: string;
}
