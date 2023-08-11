import { Text } from "@/components/Text";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { toString } from "lodash";
import React, { useCallback, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { Body, Head } from "../styled";
import { GoalInput, Item, MeterInput, Row } from "./styled";

interface Props {
	control: any;
	requires_goal: boolean;
}

export const GoalField = ({ control, requires_goal }: Props) => {
	const theme = useTheme();

	//BottomSheet
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["25%", "25%"], []);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleCloseModalPress = useCallback(() => {
		bottomSheetModalRef.current?.close();
	}, []);

	const renderBackdrop = useCallback(
		(props: any) => (
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
			<Row>
				<Controller
					name="goal"
					control={control}
					rules={{
						required: requires_goal ? "requieres un objetivo" : false,
					}}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<GoalInput
							placeholder="8"
							value={toString(value)}
							onChangeText={onChange}
							keyboardType="numeric"
							$error={error ? true : false}
						/>
					)}
				/>

				<Controller
					name="measure"
					control={control}
					rules={{
						required: requires_goal ? "requieres una medida" : false,
					}}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<>
							<MeterInput
								onPress={handlePresentModalPress}
								$error={error ? true : false}
							>
								<Text variant="subtitle_medium">{value}</Text>
							</MeterInput>

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
								<Body>
									<BottomSheetScrollView
										style={{ marginBottom: 10 }}
										showsVerticalScrollIndicator={false}
										contentContainerStyle={{
											flexDirection: "row",
											flexWrap: "wrap",
											gap: 7,
										}}
									>
										{meters.map((meter, index) => (
											<Item
												key={meter.value}
												onPress={() => onChange(meter.value)}
											>
												<Text variant="body_small">{meter.value}</Text>
											</Item>
										))}
									</BottomSheetScrollView>
								</Body>
							</BottomSheetModal>
						</>
					)}
				/>
			</Row>
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

const meters = [
	{
		value: "count",
	},
	{
		value: "steps",
	},
	{
		value: "m",
	},
	{
		value: "km",
	},
	{
		value: "mile",
	},
	{
		value: "min",
	},
	{
		value: "hr",
	},
	{
		value: "ml",
	},
	{
		value: "oz",
	},
	{
		value: "l",
	},
	{
		value: "g",
	},
	{
		value: "mg",
	},
];
