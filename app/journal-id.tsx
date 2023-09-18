import { Text } from "@/components/Text";
import { Body } from "@/features/journal/styled";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { useTheme } from "styled-components/native";

export default function JournalIdScreen() {
	const { item } = useLocalSearchParams();
	//@ts-ignore
	const newItem = JSON.parse(item);

	const getPreviewText = (): string => {
		const content: any = newItem.text;
		const newText = content.replace(/<[^>]*>/g, "");
		return newText;
	};

	return (
		<Body>
			<ScrollView>
				<Text>{getPreviewText()}</Text>
			</ScrollView>
		</Body>
	);
}
