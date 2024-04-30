import { BottomTab } from "@/src/components/bottom-tab";
import {
	ArrowLeftIcon,
	Button,
	Center,
	Heading,
	Icon,
	View,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bar, Body } from "./styled";

interface Props {
	children: React.ReactNode;
	useAppBar?: boolean;
	useBack?: boolean;
	useBottomBar?: boolean;
	label?: string;
	useTop?: boolean;
}

export const Layout: React.FC<Props> = ({
	children,
	useAppBar = true,
	useBack,
	useBottomBar,
	label = "",
	useTop = true,
}) => {
	const { top } = useSafeAreaInsets();
	const router = useRouter();

	return (
		<Body pt={useTop ? top : 20}>
			{useAppBar && (
				<Bar mb="$2">
					{useBack && (
						<Button
							w={30}
							h={30}
							bg="$background"
							onPress={() => router.back()}
						>
							<Icon as={ArrowLeftIcon} size="xl" color="#fff" />
						</Button>
					)}
					<View w={useBack ? "80%" : "100%"}>
						<Center>
							<Heading fontFamily="MacPawBold" size="lg">
								{label}
							</Heading>
						</Center>
					</View>
				</Bar>
			)}
			{children}

			{useBottomBar && <BottomTab />}
		</Body>
	);
};
