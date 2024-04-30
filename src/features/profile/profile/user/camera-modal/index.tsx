import { Button, ButtonText, Center, Heading } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { ArrowLeftIcon } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { Camera, CameraType, WhiteBalance } from "expo-camera";
import { t } from "i18next";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Modal } from "react-native";
import { Body, CameraView, Content } from "./styled";

interface Props {
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	setPicture: Dispatch<SetStateAction<string | null>>;
}

export const CameraModal: FC<Props> = ({
	isVisible,
	setIsVisible,
	setPicture,
}) => {
	const [isReadyCamera, setIsReadyCamera] = useState<boolean>(false);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [cameraRef, setCameraRef] = useState<Camera | null>(null);

	if (!permission) {
		return <View />;
	}

	const takePicture = async () => {
		if (isReadyCamera) {
			const data = await cameraRef?.takePictureAsync({
				// base64: true,
				quality: 1,
			});

			setPicture(data ? data.uri : null);
			setIsVisible(false);
		}
	};

	return (
		<Modal
			visible={isVisible}
			onRequestClose={() => {
				setIsVisible(!isVisible);
			}}
			animationType="slide"
			presentationStyle="formSheet"
		>
			<Body>
				<View position="relative">
					<Button
						w={30}
						h={30}
						bg="$background"
						onPress={() => setIsVisible(false)}
						position="absolute"
						top={0}
						left={0}
						zIndex={1}
					>
						<Icon as={ArrowLeftIcon} size="xl" color="#fff" />
					</Button>

					<Center>
						<Heading>{t("camera")}</Heading>
					</Center>
				</View>

				{!permission?.granted && (
					<View mt="$2">
						<Text style={{ textAlign: "center" }}>{t("permissions.info")}</Text>
						<Button variant="link" onPress={requestPermission}>
							<ButtonText>{t("permissions.camera")}</ButtonText>
						</Button>
					</View>
				)}

				{permission?.granted && (
					<View flex={1} alignItems="center" mt="$4">
						<Content>
							<CameraView
								type={CameraType.front}
								whiteBalance={WhiteBalance.fluorescent}
								ref={(ref) =>
									//@ts-ignore
									setCameraRef(ref)
								}
								onCameraReady={() => setIsReadyCamera(true)}
								ratio="1:1"
							/>
						</Content>

						<Button onPress={takePicture} mt="$4" w="100%" rounded="$full">
							<ButtonText>{t("takePicture")}</ButtonText>
						</Button>
					</View>
				)}
			</Body>
		</Modal>
	);
};
