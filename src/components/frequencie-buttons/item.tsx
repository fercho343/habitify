import { Text } from "@gluestack-ui/themed";
import { Button } from "./styled";

export const Item: React.FC<Props> = ({ text, isActive, onPress }) => {
	return (
		<Button isActive={isActive} onPress={onPress}>
			<Text>{text}</Text>
		</Button>
	);
};

interface Props {
  isActive: boolean;
	text: string;
  onPress: any;
}
