import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { t } from "i18next";
import React, { useCallback, useRef } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Text } from "../Text";
import { Sheet } from "./Sheet";
import { ColorBtn } from "./styled";

interface Props {
	control: any;
}

export const ColorInput: React.FC<Props> = ({ control }) => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<>
			<Controller
				name="color"
				control={control}
				rules={{
					required: {
						value: true,
						message: t("error.color"),
					},
				}}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<View style={{ marginLeft: 10 }}>
						<Text>Color</Text>
						<ColorBtn $value={value} onPress={handlePresentModalPress} />

						<Sheet
							bottomSheetModalRef={bottomSheetModalRef}
							value={value}
							onChange={onChange}
						/>
					</View>
				)}
			/>
		</>
	);
};
