import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	Text,
} from "@gluestack-ui/themed";
import { t } from "i18next";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import ColorPicker from "react-native-wheel-color-picker";
import { Body, Box } from "./styled";

export const ColorButton: React.FC<Props> = ({ control }) => {
	const [showActionsheet, setShowActionsheet] = useState<boolean>(false);
	const handleClose = () => setShowActionsheet(!showActionsheet);

	return (
		<Controller
			control={control}
			name="color"
			render={({ field: { onChange, value } }) => {
				return (
					<>
						<Body>
							<Text size="xs">{t("color")}</Text>

							<Box onPress={handleClose} backgroundColor={value} />
						</Body>
						<Actionsheet
							useRNModal
							isOpen={showActionsheet}
							onClose={handleClose}
							zIndex={999}
							snapPoints={[40]}
						>
							<ActionsheetBackdrop />
							<ActionsheetContent zIndex={999} bg="$card" pb="$10" px={16}>
								<ActionsheetDragIndicatorWrapper>
									<ActionsheetDragIndicator bg="$textDark100" />
								</ActionsheetDragIndicatorWrapper>

								<ColorPicker
									color={value}
									onColorChange={(color) => onChange(color)}
									thumbSize={30}
									sliderSize={30}
									noSnap={true}
									row={false}
								/>
							</ActionsheetContent>
						</Actionsheet>
					</>
				);
			}}
		/>
	);
};

interface Props {
	control: Control<any>;
}
