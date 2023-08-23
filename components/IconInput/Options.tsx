import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { t } from "i18next";
import React, { useCallback, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { Text } from "../Text";
import { Button } from "./Button";
import { Body, Head } from "./styled";

interface Props {
	bottomSheetModalRef: any;
	onChange: (value: string) => void;
}

export const Options: React.FC<Props> = ({ bottomSheetModalRef, onChange }) => {
	const theme = useTheme();

	//BottomSheet

	const snapPoints = useMemo(() => ["50%", "50%"], []);

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
			<Body>
				<BottomSheetScrollView
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
				</BottomSheetScrollView>
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
				<Text style={{ color: theme.colors.primary }}>{t("done")}</Text>
			</TouchableOpacity>
		</Head>
	);
};

const emojis = [
	{
		text: "🗣️",
		description: "Speak with respect and listen attentively to others.",
	},
	{
		text: "💅🏼",
		description: "Maintain good personal hygiene and take care of your nails.",
	},
	{
		text: "🏃",
		description: "Engage in regular exercise to maintain an active lifestyle.",
	},
	{
		text: "🏃‍♀️",
		description: "Engage in regular exercise to maintain an active lifestyle.",
	},
	{
		text: "🪡",
		description:
			"Learn practical skills like sewing to become more self-sufficient.",
	},
	{ text: "🌿", description: "Take care of plants and the environment." },
	{ text: "☘️", description: "Take care of plants and the environment." },
	{
		text: "🍀",
		description: "Seek luck in the opportunities that come your way.",
	},
	{ text: "🪴", description: "Take care of plants and the environment." },
	{ text: "🌱", description: "Take care of plants and the environment." },
	{ text: "🌷", description: "Appreciate the beauty of flowers and nature." },
	{ text: "🌞", description: "Enjoy sunny days and maintain a positive mood." },
	{
		text: "🌙",
		description: "Get enough rest during the night to maintain health.",
	},
	{ text: "💧", description: "Drink enough water to stay hydrated." },
	{
		text: "🍎",
		description: "Include fruits and vegetables in your diet to stay healthy.",
	},
	{
		text: "🫐",
		description: "Include fruits and vegetables in your diet to stay healthy.",
	},
	{
		text: "🥑",
		description: "Include fruits and vegetables in your diet to stay healthy.",
	},
	{
		text: "🥦",
		description: "Include fruits and vegetables in your diet to stay healthy.",
	},
	{
		text: "🥬",
		description: "Include fruits and vegetables in your diet to stay healthy.",
	},
	{ text: "🥯", description: "Enjoy baked goods occasionally." },
	{
		text: "🍞",
		description: "Include whole grains in your diet to stay healthy.",
	},
	{ text: "🥞", description: "Enjoy pancakes occasionally." },
	{ text: "🍳", description: "Prepare healthy and balanced meals." },
	{ text: "🥓", description: "Consume protein-rich foods in moderation." },
	{ text: "🍗", description: "Consume protein-rich foods in moderation." },
	{ text: "🍔", description: "Enjoy burgers occasionally." },
	{ text: "🍕", description: "Enjoy pizza occasionally." },
	{
		text: "🥗",
		description: "Include salads and vegetables in your diet to stay healthy.",
	},
	{ text: "🥙", description: "Enjoy healthy snacks like wraps." },
	{ text: "🥪", description: "Enjoy sandwiches occasionally." },
	{ text: "🫔", description: "Enjoy delicious and well-presented meals." },
	{ text: "🌮", description: "Enjoy tacos and Mexican cuisine occasionally." },
	{ text: "🫕", description: "Enjoy delicious and well-presented meals." },
	{
		text: "🍙",
		description: "Include foods like rice in your diet to stay healthy.",
	},
	{ text: "🍨", description: "Enjoy desserts occasionally." },
	{ text: "🍡", description: "Enjoy sweets and desserts occasionally." },
	{ text: "☕️", description: "Enjoy coffee and hot beverages in moderation." },
	{ text: "🧃", description: "Drink natural juices and stay hydrated." },
	{ text: "🍺", description: "Consume alcohol responsibly and in moderation." },
	{
		text: "⚽️",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{
		text: "🏀",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{
		text: "🏈",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{
		text: "⚾️",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{
		text: "🥎",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{
		text: "🎾",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{
		text: "🏐",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{
		text: "🏉",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{
		text: "🥏",
		description:
			"Engage in sports and exercise to maintain an active lifestyle.",
	},
	{ text: "🎱", description: "Enjoy board games and recreational activities." },
	{ text: "🪀", description: "Enjoy board games and recreational activities." },
	{ text: "🏓", description: "Enjoy board games and recreational activities." },
	{ text: "🏸", description: "Enjoy board games and recreational activities." },
	{ text: "🏒", description: "Enjoy board games and recreational activities." },
	{ text: "🏑", description: "Enjoy board games and recreational activities." },
	{ text: "🥍", description: "Enjoy board games and recreational activities." },
	{ text: "🏏", description: "Enjoy board games and recreational activities." },
	{ text: "🪃", description: "Enjoy board games and recreational activities." },
	{ text: "🥅", description: "Enjoy board games and recreational activities." },
	{ text: "⛳️", description: "Enjoy outdoor activities like golf." },
	{ text: "🪁", description: "Enjoy outdoor activities like flying kites." },
	{ text: "🛝", description: "Enjoy creative and hands-on activities." },
	{ text: "🏹", description: "Enjoy outdoor activities like archery." },
	{ text: "🎣", description: "Enjoy outdoor activities like fishing." },
	{ text: "🤿", description: "Enjoy water activities like diving." },
	{
		text: "🥊",
		description:
			"Engage in combat sports and martial arts to maintain an active lifestyle.",
	},
	{
		text: "🥋",
		description:
			"Engage in combat sports and martial arts to maintain an active lifestyle.",
	},
	{
		text: "🎽",
		description: "Stay active and engage in sports to maintain health.",
	},
	{ text: "🛹", description: "Enjoy outdoor activities like skateboarding." },
	{ text: "🛼", description: "Enjoy outdoor activities like roller skating." },
	{ text: "🛷", description: "Enjoy outdoor activities like sledding." },
	{ text: "⛸️", description: "Enjoy outdoor activities like ice skating." },
	{ text: "🥌", description: "Enjoy outdoor activities like curling." },
	{ text: "🎿", description: "Enjoy outdoor activities like skiing." },
	{ text: "⛷️", description: "Enjoy outdoor activities like skiing." },
	{ text: "🏂", description: "Enjoy outdoor activities like snowboarding." },
	{ text: "🪂", description: "Enjoy thrilling activities like skydiving." },
	{
		text: "🏋️‍♀️",
		description: "Engage in weightlifting to maintain an active lifestyle.",
	},
	{
		text: "🏋️",
		description: "Engage in weightlifting to maintain an active lifestyle.",
	},
	{
		text: "🤼‍♀️",
		description:
			"Engage in wrestling and combat sports to maintain an active lifestyle.",
	},
	{
		text: "🤼",
		description:
			"Engage in wrestling and combat sports to maintain an active lifestyle.",
	},
	{
		text: "🤸‍♀️",
		description:
			"Engage in gymnastics and acrobatic activities to maintain an active lifestyle.",
	},
	{
		text: "🤸‍♂️",
		description:
			"Engage in gymnastics and acrobatic activities to maintain an active lifestyle.",
	},
	{
		text: "⛹️",
		description: "Engage in basketball and maintain an active lifestyle.",
	},
	{
		text: "⛹️‍♂️",
		description: "Engage in basketball and maintain an active lifestyle.",
	},
	{ text: "🏌️‍♀️", description: "Play golf and enjoy the outdoors." },
	{ text: "🏌️", description: "Play golf and enjoy the outdoors." },
	{
		text: "🤾‍♀️",
		description: "Engage in handball and maintain an active lifestyle.",
	},
	{
		text: "🤾",
		description: "Engage in handball and maintain an active lifestyle.",
	},
	{ text: "🏄‍♀️", description: "Enjoy water sports like surfing." },
	{ text: "🏄", description: "Enjoy water sports like surfing." },
	{
		text: "🏊‍♀️",
		description: "Swim regularly and maintain an active lifestyle.",
	},
	{
		text: "🏊",
		description: "Swim regularly and maintain an active lifestyle.",
	},
	{ text: "🚣‍♀️", description: "Enjoy water activities like rowing." },
	{ text: "🚣", description: "Enjoy water activities like rowing." },
	{
		text: "🧗‍♀️",
		description: "Engage in climbing and push your personal limits.",
	},
	{
		text: "🧗",
		description: "Engage in climbing and push your personal limits.",
	},
	{
		text: "🚵‍♀️",
		description: "Enjoy cycling and maintain an active lifestyle.",
	},
	{
		text: "🚵",
		description: "Enjoy cycling and maintain an active lifestyle.",
	},
	{
		text: "🚴‍♀️",
		description: "Enjoy cycling and maintain an active lifestyle.",
	},
	{
		text: "🚴",
		description: "Enjoy cycling and maintain an active lifestyle.",
	},
	{
		text: "🤹‍♀️",
		description: "Practice juggling skills and engage in creative activities.",
	},
	{
		text: "🤹",
		description: "Practice juggling skills and engage in creative activities.",
	},
	{
		text: "🎨",
		description: "Explore and develop your creativity through art.",
	},
	{
		text: "🎭",
		description: "Participate in theatrical activities and express emotions.",
	},
	{ text: "🎬", description: "Enjoy movies and audiovisual entertainment." },
	{
		text: "🎤",
		description: "Enjoy music and express yourself through singing.",
	},
	{ text: "🎧", description: "Enjoy music and maintain a relaxed lifestyle." },
	{ text: "🎼", description: "Enjoy music and maintain a relaxed lifestyle." },
	{
		text: "🎹",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🪇",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🥁",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🪘",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🎷",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🎺",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🪗",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🎸",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🪕",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{
		text: "🎻",
		description:
			"Learn to play musical instruments and express yourself through music.",
	},
	{ text: "🪈", description: "Enjoy board games and intellectual activities." },
	{ text: "🎲", description: "Enjoy board games and intellectual activities." },
	{ text: "♟️", description: "Enjoy board games and intellectual activities." },
	{ text: "🎯", description: "Enjoy precision games and improve your skills." },
	{ text: "🎳", description: "Enjoy precision games and improve your skills." },
	{
		text: "🎮",
		description: "Enjoy video games and balance them with other activities.",
	},
	{ text: "🎰", description: "Enjoy casino entertainment responsibly." },
	{ text: "🧩", description: "Solve puzzles and exercise your mind." },
	{ text: "🏎️", description: "Enjoy speed safely, such as in car racing." },
	{ text: "🚗", description: "Drive responsibly and adhere to traffic rules." },
	{ text: "🛵", description: "Drive small vehicles safely and responsibly." },
	{
		text: "🚲",
		description: "Enjoy cycling and maintain an active lifestyle.",
	},
	{ text: "🛴", description: "Drive small vehicles safely and responsibly." },
	{
		text: "🚃",
		description: "Use public transportation and reduce your carbon footprint.",
	},
	{ text: "🚁", description: "Enjoy helicopter flights occasionally." },
	{ text: "🛶", description: "Enjoy canoe rides and water activities." },
	{
		text: "🛟",
		description: "Enjoy culture and history through museum visits.",
	},
	{
		text: "🏰",
		description: "Enjoy history and architecture by visiting castles.",
	},
	{
		text: "🎡",
		description: "Enjoy attractions at fairs and amusement parks.",
	},
	{
		text: "🎢",
		description: "Enjoy thrilling roller coasters at amusement parks.",
	},
	{ text: "🏖️", description: "Enjoy vacations and leisure time at the beach." },
	{ text: "🏕️", description: "Enjoy nature and the outdoors through camping." },
	{ text: "🏔️", description: "Explore and enjoy the beauty of mountains." },
	{ text: "🌄", description: "Enjoy sunrises and sunsets in nature." },
	{
		text: "🏞️",
		description: "Explore and enjoy the beauty of natural landscapes.",
	},
	{ text: "🌅", description: "Enjoy sunrises and sunsets in nature." },
	{ text: "🌉", description: "Enjoy architecture and views of bridges." },
	{
		text: "🚰",
		description: "Value water as a precious resource and use it consciously.",
	},
	{
		text: "🛀",
		description: "Enjoy moments of relaxation and personal care in the bath.",
	},
	{
		text: "🧼",
		description: "Maintain good personal hygiene and take care of your health.",
	},
	{
		text: "🪥",
		description: "Take care of your teeth and maintain good oral health.",
	},
	{
		text: "📱",
		description: "Use technology in a balanced and conscious manner.",
	},
	{
		text: "🖥️",
		description: "Use technology in a balanced and conscious manner.",
	},
	{ text: "📷", description: "Capture special moments and enjoy photography." },
	{
		text: "🎥",
		description: "Enjoy movies and audiovisual content responsibly.",
	},
	{
		text: "💳",
		description: "Manage your finances responsibly and avoid debt.",
	},
	{ text: "💵", description: "Value money and use it consciously." },
	{ text: "🛌", description: "Get enough rest to maintain good health." },
	{
		text: "📉",
		description:
			"Learn from experiences and use mistakes as opportunities for growth.",
	},
	{
		text: "📊",
		description: "Analyze data and make informed decisions in various areas.",
	},
	{
		text: "📚",
		description: "Cultivate the habit of reading and continuous learning.",
	},
	{
		text: "📝",
		description: "Take notes and write creatively or informatively.",
	},
	{
		text: "🔍",
		description: "Seek information and be curious in various aspects of life.",
	},
	{
		text: "🎶",
		description: "Enjoy music and explore different genres and styles.",
	},
];
