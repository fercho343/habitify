import { Text } from "@/components/Text";
import { Btn, Crd } from "./styled";

type StatusType = "checked" | "unchecked";

interface ItemProps {
	label: string;
	status: StatusType;
	onPress: () => void;
}

export const Item = ({ label, status, onPress }: ItemProps) => {
	return (
		<Btn status={status} onPress={onPress}>
			<Crd status={status} style={{ elevation: 5 }}>
				<Text variant="subtitle_medium">{label}</Text>
			</Crd>
		</Btn>
	);
};
