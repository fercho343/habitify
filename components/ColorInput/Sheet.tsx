import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { useTheme } from "styled-components/native";
import { Body, Head } from "../IconInput/styled";
import { Text } from "../Text";

interface Props {
	value: string;
	bottomSheetModalRef: any;
	onChange: (value: string) => void;
}

export const Sheet: React.FC<Props> = ({
	bottomSheetModalRef,
	value,
	onChange,
}) => {
	const theme = useTheme();

	const snapPoints = useMemo(() => ["55%", "55%"], []);
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
