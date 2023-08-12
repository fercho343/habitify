import { Text } from "@/components/Text";
import { Layout } from "@/infrastructure/layout";
import { ProfileContext } from "@/services/context/ProfileContext";
import { Camera, CameraType } from "expo-camera";
import { t } from "i18next";
import React, { useContext, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Bar, Body, Button, CameraContent, Icon, TitleContext } from "./styled";

interface Props {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	setPicture: (picture: string | null) => void;
}

export const ModalCamera = ({
	modalVisible,
	setModalVisible,
	setPicture,
}: Props) => {
	const theme = useTheme();

	const [isReadyCamera, setIsReadyCamera] = useState(false);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [cameraRef, setCameraRef] = useState<Camera | null>(null);

	const { saveProfile } = useContext(ProfileContext);

	const takePicture = async () => {
		if (isReadyCamera) {
			const data = await cameraRef?.takePictureAsync({
				// base64: true,
				quality: 1,
			});

			setPicture(data ? data.uri : null);
			setModalVisible(false);
			saveProfile({ name: "", picture: data ? data.uri : "" });
		}
	};

	if (!permission) {
		return <View />;
	}

	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={modalVisible}
			presentationStyle="formSheet"
		>
			<Layout>
				<Bar>
					<TouchableOpacity onPress={() => setModalVisible(false)}>
						<Icon name="down" />
					</TouchableOpacity>
					<TitleContext>
						<Text variant="subtitle_medium" style={{ textAlign: "center" }}>
							{t("camera")}
						</Text>
					</TitleContext>
				</Bar>

				{!permission.granted ? (
					<View>
						<Text style={{ textAlign: "center" }}>
							We need your permission to show the camera
						</Text>
						<Button onPress={requestPermission}>
							<Text
								variant="body_large"
								style={{ color: theme.colors.background }}
							>
								{t("permissions.camera")}
							</Text>
						</Button>
					</View>
				) : (
					<Body>
						<CameraContent>
							<Camera
								ref={(ref) => setCameraRef(ref)}
								style={{
									width: "100%",
									height: "100%",
									overflow: "hidden",
									borderRadius: 10,
								}}
								type={CameraType.front}
								ratio="1:1"
								onCameraReady={() => setIsReadyCamera(true)}
							/>
						</CameraContent>

						<Button onPress={takePicture}>
							<Text
								variant="body_large"
								style={{ color: theme.colors.background }}
							>
								{t("take-picture")}
							</Text>
						</Button>
					</Body>
				)}
			</Layout>
		</Modal>
	);
};
