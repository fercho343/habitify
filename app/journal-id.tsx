import { Body } from "@/features/journal/styled";
import { useLocalSearchParams } from "expo-router";
import { RichEditor } from "react-native-pell-rich-editor";
import { useTheme } from "styled-components/native";

export default function JournalIdScreen() {
	const { item } = useLocalSearchParams();
	const theme = useTheme();
	//@ts-ignore
	const newItem = JSON.parse(item);

	return (
		<Body>
			<RichEditor
				initialContentHTML={newItem.text}
				editorStyle={{
					backgroundColor: theme.colors.background,
					color: theme.colors.text,
				}}
			/>
		</Body>
	);
}
