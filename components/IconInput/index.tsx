import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { t } from "i18next";
import React, { useCallback, useRef } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Text } from "../Text";
import { Options } from "./Options";
import { IconBox } from "./styled";

interface Props {
	control: any;
}

export const IconInput: React.FC<Props> = ({ control }) => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<>
			<Controller
				name="icon"
				control={control}
				rules={{
					required: {
						value: true,
						message: t("error.icon"),
					},
				}}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<View>
						<Text>{t("icon")}</Text>
						<IconBox onPress={handlePresentModalPress}>
							<Text>{value}</Text>
						</IconBox>

						<Options
							bottomSheetModalRef={bottomSheetModalRef}
							onChange={onChange}
						/>
					</View>
				)}
			/>
		</>
	);
};
