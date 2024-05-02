import {
	AddIcon,
	Avatar,
	AvatarFallbackText,
	AvatarImage,
	Button,
	ButtonIcon,
	Text,
	View,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { t } from "i18next";
import { toLower } from "lodash";
import moment from "moment";
import { Bar, UserBox, UserContent } from "./styled";

export const TopBar = () => {
	const name = "Frank Suarez";
	const picture = null;

	const today = moment();

	return (
		<Bar>
			<UserBox>
				<UserContent>
					<Avatar borderRadius="$full">
						{picture ? (
							<AvatarImage source={{ uri: picture }} alt={name} />
						) : (
							<AvatarFallbackText>{name}</AvatarFallbackText>
						)}
						{/* <Badge
							h={34}
							w={34}
							bg="$background"
							borderRadius="$full"
							mb={-25}
							mr={-10}
							zIndex={1}
							variant="solid"
							alignSelf="flex-end"
						>
							<NvText color="$white">Nv 2</NvText>
						</Badge> */}
					</Avatar>
				</UserContent>

				<View>
					<Text>
						{t("welcome")}, {name}!
					</Text>
					<Text style={{ marginTop: 1 }} size="xs">{`${t("today")}  ${t(
						toLower(today.format("dddd")),
					)}`}</Text>
				</View>
			</UserBox>

			<Link href="/add-habit" asChild>
				<Button borderRadius="$full" size="sm" p="$3.5" w={30} h={30}>
					<ButtonIcon as={AddIcon} />
				</Button>
			</Link>
		</Bar>
	);
};
