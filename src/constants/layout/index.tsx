import { ArrowLeftIcon, Center, Icon, Text, View } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Bar, Body } from "./styled";

export const Layout: React.FC<Props> = ({
	children,
	useAppBar = true,
	useBack,
	label = "",
}) => {
	return (
		<Body>
			{useAppBar && (
				<Bar>
					<View w="2%">
						<TouchableOpacity onPress={() => router.back()}>
							<Icon as={ArrowLeftIcon} size="xl" color="#fff" />
						</TouchableOpacity>
					</View>
					<View w="97%">
						<Center>
							<Text size="lg">{label}</Text>
						</Center>
					</View>
				</Bar>
			)}
			{children}
		</Body>
	);
};

interface Props {
	children: React.ReactNode;
	useAppBar?: boolean;
	useBack?: boolean;
	label?: string;
}
