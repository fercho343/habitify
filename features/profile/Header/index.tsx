import { Nv } from "@/components/Nv";
import { Text } from "@/components/Text";
import { useProfile } from "@/services/context/ProfileContext";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { t } from "i18next";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components/native";
import { ModalCamera } from "./ModalCamera";
import { NameInput } from "./NameInput";
import { Avatar, BodySheet, Content, Head, ItemMenu } from "./styled";

export const Header = () => {
	const theme = useTheme();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["20%", "20%"], []);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const renderBackdrop = useCallback(
		//@ts-ignore
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
				pressBehavior="close"
			/>
		),
		[],
	);

	const { profile, saveProfile } = useProfile();

	//Take picture
	const [picture, setPicture] = useState<string | null>(profile.picture);
	const [modalVisible, setModalVisible] = useState(false);

	const handleOpenCamera = () => {
		setModalVisible(true);
		bottomSheetModalRef.current?.close();
	};

	//Picker image
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setPicture(result.assets[0].uri);
			saveProfile({ picture: result.assets[0].uri, name: "" });
			bottomSheetModalRef.current?.close();
		}
	};

	return (
		<>
			<Head>
				<Content onPress={handlePresentModalPress}>
					<Avatar
						source={
							picture
								? { uri: picture }
								: require("@/assets/images/no-profile.png")
						}
						transition={0}
					/>
					<Nv width={60} height={60} bottom={-15} right={-10} fontSize={18} />
				</Content>
				<NameInput />
			</Head>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				backgroundStyle={{ backgroundColor: theme.colors.card }}
				backdropComponent={renderBackdrop}
				handleComponent={null}
			>
				<BodySheet>
					<ItemMenu onPress={pickImage}>
						<Text variant="subtitle_medium">{t("image-galery")}</Text>
					</ItemMenu>

					<ItemMenu onPress={handleOpenCamera}>
						<Text variant="subtitle_medium">{t("image-camera")}</Text>
					</ItemMenu>
				</BodySheet>
			</BottomSheetModal>

			{/* TAKE PICTURE */}
			{modalVisible && (
				<ModalCamera
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					setPicture={setPicture}
				/>
			)}
		</>
	);
};
