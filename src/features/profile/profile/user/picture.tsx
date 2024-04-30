import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Icon,
    Pressable,
} from "@gluestack-ui/themed";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { t } from "i18next";
import { CameraIcon, ImageIcon } from "lucide-react-native";
import { useState } from "react";

export const Picture = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleClose = () => setIsOpen(!isOpen);

	const [picture, setPicture] = useState<string | null>(null);

	//Picker image
	const pickImage = async () => {
		handleClose();
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setPicture(result.assets[0].uri);
			// saveProfile({ picture: result.assets[0].uri, name: "" });
		}
	};

	return (
		<>
			<Pressable onPress={handleClose}>
				<Avatar size="2xl" borderRadius="$full">
					{picture ? (
						<AvatarImage source={{ uri: picture }} alt="Sandeep Srivastava" />
					) : (
						<AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
					)}
				</Avatar>
			</Pressable>

			<Actionsheet isOpen={isOpen} onClose={handleClose} snapPoints={[18]}>
				<ActionsheetBackdrop />
				<ActionsheetContent bg="$backgroundLight950">
					<ActionsheetDragIndicatorWrapper>
						<ActionsheetDragIndicator bg="$textDark900" />
					</ActionsheetDragIndicatorWrapper>

					<ActionsheetItem onPress={pickImage}>
						<Icon as={ImageIcon} color="$textDark900" size="lg" />
						<ActionsheetItemText>{t("imageGalery")}</ActionsheetItemText>
					</ActionsheetItem>

					<ActionsheetItem onPress={handleClose}>
						<Icon as={CameraIcon} color="$textDark900" size="lg" />
						<ActionsheetItemText>{t("camera")}</ActionsheetItemText>
					</ActionsheetItem>
				</ActionsheetContent>
			</Actionsheet>
		</>
	);
};
