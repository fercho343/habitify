import { BottomTab } from "@/src/components/bottom-tab";
import { ArrowLeftIcon, Center, Icon, Text, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Bar, Body } from "./styled";

export const Layout: React.FC<Props> = ({
	children,
	useAppBar = true,
	useBack,
	useBottomBar,
	label = "",
}) => {
	const router = useRouter();

	return (
		<Body>
			{useAppBar && (
				<Bar>
					{useBack && (
						<View w="2%">
							<TouchableOpacity onPress={() => router.back()}>
								<Icon as={ArrowLeftIcon} size="xl" color="#fff" />
							</TouchableOpacity>
						</View>
					)}
					<View w={useBack ? "97%" : "100%"}>
						<Center>
							<Text fontFamily="MacPawBold" size="lg">
								{label}
							</Text>
						</Center>
					</View>
				</Bar>
			)}
			{children}

			{useBottomBar && <BottomTab />}
		</Body>
	);
};

interface Props {
	children: React.ReactNode;
	useAppBar?: boolean;
	useBack?: boolean;
	useBottomBar?: boolean;
	label?: string;
}
