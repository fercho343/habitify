import { Text } from "@/components/Text";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { useTheme } from "styled-components/native";
import { Body, ColorBtn, Head } from "./styled";

interface Props {
	value: string;
	onChange: (value: string) => void;
	error: boolean;
}

export const ColorButton = ({ value, onChange, error }: Props) => {
	const theme = useTheme();
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => ["55%", "55%"], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleCloseModalPress = useCallback(() => {
		bottomSheetModalRef.current?.close();
	}, []);

	const renderBackdrop = useCallback(
		//@ts-ignore
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
				pressBehavior="none"
			/>
		),
		[],
	);

	return (
		<>
			<View style={{ marginLeft: 10 }}>
				<Text style={{ marginBottom: 5, textAlign: "center" }}>Color</Text>
				<ColorBtn $value={value} onPress={handlePresentModalPress} />
			</View>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				handleComponent={null}
				enablePanDownToClose={false}
				backgroundStyle={{ backgroundColor: theme.colors.card }}
				backdropComponent={renderBackdrop}
			>
				<Header onPress={handleCloseModalPress} />
				<Body style={{ marginBottom: 30 }}>
					<ColorPicker
						color={value}
						onColorChange={(color) => onChange(color)}
						thumbSize={30}
						sliderSize={30}
						noSnap={true}
						row={false}
					/>
				</Body>
			</BottomSheetModal>
		</>
	);
};

interface HeaderTypes {
	onPress: () => void;
}

const Header = ({ onPress }: HeaderTypes) => {
	const theme = useTheme();

	return (
		<Head>
			<TouchableOpacity onPress={onPress}>
				<Text style={{ color: theme.colors.primary }}>Aceptar</Text>
			</TouchableOpacity>
		</Head>
	);
};
