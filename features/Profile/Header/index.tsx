import { Text } from "@/components/Text";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { t } from "i18next";
import { useCallback, useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { ModalCamera } from "./ModalCamera";
import { NameInput } from "./NameInput";
import { Avatar, BodySheet, Head, ItemMenu } from "./styled";

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

	//Take picture
	const [picture, setPicture] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const handleOpenCamera = () => {
		setModalVisible(true);
		bottomSheetModalRef.current?.close();
	};

	return (
		<>
			<Head>
				<TouchableOpacity onPress={handlePresentModalPress}>
					<Avatar
						source={
							picture
								? { uri: picture }
								: require("@/assets/images/no-profile.png")
						}
						transition={0}
					/>
				</TouchableOpacity>
				<NameInput name="Samantha" />
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
					<ItemMenu>
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
