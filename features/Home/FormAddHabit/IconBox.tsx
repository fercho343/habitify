import { Text } from "@/components/Text";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Button } from "./Button";
import { Body, Head, IconButton } from "./styled";

interface Props {
	value: string;
	onChange: (value: string) => void;
	error: boolean;
}

export const IconBox = ({ value, onChange, error }: Props) => {
	const theme = useTheme();
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => ["50%", "50%"], []);

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
			<View>
				<Text style={{ marginBottom: 5 }}>Icono</Text>
				<IconButton onPress={handlePresentModalPress} $error={error}>
					<Text>{value}</Text>
				</IconButton>
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
				<Body>
					<ScrollView
						style={{ marginBottom: 10 }}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-between",
							gap: 5,
						}}
					>
						{emojis.map((emoji, index) => (
							<Button key={emoji.text} onChange={onChange} {...emoji} />
						))}
					</ScrollView>
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

const emojis = [
	{ text: "🏃", description: "Exercise" },
	{ text: "🥦", description: "Healthy eating" },
	{ text: "🧘‍♂️", description: "Meditation" },
	{ text: "📚", description: "Reading" },
	{ text: "💤", description: "Rest" },
	{ text: "🌞", description: "Early start to the day" },
	{ text: "🚰", description: "Drink water" },
	{ text: "🍎", description: "Eat fruits" },
	{ text: "🥗", description: "Balanced diet" },
	{ text: "🕊️", description: "Practice gratitude" },
	{ text: "🚴‍♂️", description: "Cycling" },
	{ text: "🎯", description: "Set goals" },
	{ text: "🧹", description: "Cleaning" },
	{ text: "📝", description: "To-do list" },
	{ text: "🛌", description: "Bedtime" },
	{ text: "🚭", description: "Quit smoking" },
	{ text: "🎵", description: "Listen to music" },
	{ text: "🧋", description: "Have tea or coffee" },
	{ text: "🎨", description: "Creativity" },
	{ text: "👣", description: "Take a walk" },
	{ text: "🎙️", description: "Public speaking" },
	{ text: "🧼", description: "Personal hygiene" },
	{ text: "🕰️", description: "Time management" },
	{ text: "🌱", description: "Care for plants" },
	{ text: "🎓", description: "Learning" },
	{ text: "🎈", description: "Celebrating achievements" },
	{ text: "💪", description: "Strength and exercise" },
	{ text: "🏆", description: "Achieving goals" },
	{ text: "🚀", description: "Constant progress" },
	{ text: "🍉", description: "Eat fruits" },
	{ text: "🏡", description: "Keep home tidy" },
	{ text: "🌊", description: "Relaxation" },
	{ text: "📸", description: "Practice photography" },
	{ text: "🤝", description: "Social connections" },
	{ text: "🧠", description: "Positive mindset" },
	{ text: "🍽️", description: "Mindful eating" },
	{ text: "🗓️", description: "Planning" },
	{ text: "💡", description: "Inspiration" },
	{ text: "💧", description: "Hydration" },
	{ text: "🧩", description: "Problem-solving" },
	{ text: "👏", description: "Applause for effort" },
	{ text: "✨", description: "Shine throughout the day" },
	{ text: "🏊‍♂️", description: "Swimming" },
	{ text: "🚶‍♀️", description: "Walking" },
	{ text: "🌤️", description: "Sunny day" },
	{ text: "🏞️", description: "Explore nature" },
	{ text: "🚴", description: "Cycling" },
	{ text: "🤸‍♀️", description: "Physical activity" },
	{ text: "🥑", description: "Healthy food" },
	{ text: "🧘‍♀️", description: "Mental well-being" },
	{ text: "🌿", description: "Green living" },
	{ text: "🍃", description: "Breathe fresh air" },
	{ text: "💬", description: "Open communication" },
	{ text: "🚶‍♂️", description: "Walking" },
	{ text: "🌄", description: "New beginnings" },
	{ text: "🌅", description: "Sunset" },
	{ text: "🌙", description: "Restful moment" },
	{ text: "🎶", description: "Musical relaxation" },
	{ text: "🏋️‍♂️", description: "Physical training" },
	{ text: "🛏️", description: "Rest and recovery" },
	{ text: "🌟", description: "Achieving goals" },
	{ text: "🗂️", description: "Organization" },
	{ text: "🏄‍♂️", description: "Surfing" },
	{ text: "🍀", description: "Luck in endeavors" },
];
