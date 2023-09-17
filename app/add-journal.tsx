import { Body } from "@/features/journal/styled";
import { useProfile } from "@/services/context/ProfileContext";
import { AntDesign } from "@expo/vector-icons";
import { randomUUID } from "expo-crypto";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { useNavigation } from "expo-router";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
	RichEditor,
	RichToolbar,
	actions,
} from "react-native-pell-rich-editor";
import { useTheme } from "styled-components/native";

export default function AddJournalScreen() {
	const theme = useTheme();
	//@ts-ignore
	const navigation = useNavigation();
	const richText = useRef<RichEditor>(null);

	const { saveJournalEntry } = useProfile();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={handleSave}>
					<AntDesign
						name="save"
						size={25}
						color="#fff"
						style={Platform.OS === "android" && { marginRight: 10 }}
					/>
				</TouchableOpacity>
			),
		});
	}, []);

	const handleSave = async () => {
		const text = await richText.current?.getContentHtml();
		const newText: string = text ? text : "";
		const entry = {
			id: randomUUID(),
			text: newText,
			date: new Date(),
		};
		await saveJournalEntry(entry);
	};

	async function onPressAddImage() {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			base64: true,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			richText.current?.insertImage(
				`data:image/png;base64,${result.assets[0].base64}`,
			);
		}
	}

	return (
		<Body>
			<RichToolbar
				editor={richText}
				selectedIconTint={theme.colors.primary}
				actions={[
					actions.keyboard,
					actions.setBold,
					actions.setItalic,
					actions.setUnderline,
					actions.setStrikethrough,
					actions.insertImage,
					actions.insertBulletsList,
					actions.insertOrderedList,
					actions.checkboxList,
				]}
				onPressAddImage={onPressAddImage}
			/>

			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1 }}
				>
					<RichEditor
						ref={richText}
						style={{ flex: 1 }}
						editorStyle={{
							backgroundColor: theme.colors.card,
							color: theme.colors.text,
						}}
						placeholder={t("write-some")}
						// initialContentHTML={
						// 	"Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>"
						// }
					/>
				</KeyboardAvoidingView>
			</ScrollView>
		</Body>
	);
}
