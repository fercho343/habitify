import { useHabit } from "@/src/services/context/habit.context";
import { Habit } from "@/src/types/habit";
import { getContrastYIQ } from "@/src/utils/getContsastYIQ";
import {
	Button,
	ButtonIcon,
	EditIcon,
	HStack,
	Heading,
	Text,
	TrashIcon,
} from "@gluestack-ui/themed";
import { t } from "i18next";
import { FC } from "react";
import { Bar, Circle, Head } from "./header.styled";

interface Props {
	habit: Habit;
}

export const Header: FC<Props> = ({ habit }) => {
	const { id, icon, name, color, frequency, description } = habit;
	const { deleteHabit } = useHabit();

	const colorMode = getContrastYIQ(color);

	function isActive(dayText: string): boolean {
		return frequency.find((day) => "monday") ? true : false;
	}

	return (
		<Head backgroundColor={color}>
			<Bar>
				<Circle isActive>
					<Text>{icon}</Text>
				</Circle>

				<HStack>
					<Button
						w={45}
						h={45}
						rounded="$full"
						variant="solid"
						bg="$background"
						$active-opacity="$50"
						mr="$2"
					>
						<ButtonIcon as={EditIcon} />
					</Button>
					<Button
						w={45}
						h={45}
						rounded="$full"
						variant="solid"
						bg="$background"
						$active-opacity="$50"
						onPress={() => deleteHabit(id)}
					>
						<ButtonIcon as={TrashIcon} color="$error400" />
					</Button>
				</HStack>
			</Bar>

			<Heading
				size="2xl"
				mt="$3"
				color={colorMode === "dark" ? "#000" : "$textDark400"}
			>
				{name}
			</Heading>

			{description && <Text color="$trueGray400">{description}</Text>}

			<Bar mt={16}>
				<Circle isActive={isActive("monday")}>
					<Text color="$trueGray400">{t("days.monday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive={isActive("tuesday")}>
					<Text color="$trueGray400">{t("days.tuesday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive={isActive("wednesday")}>
					<Text color="$trueGray400">
						{t("days.wednesday").substring(0, 2)}
					</Text>
				</Circle>

				<Circle isActive={isActive("thursday")}>
					<Text color="$trueGray400">{t("days.thursday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive={isActive("friday")}>
					<Text color="$trueGray400">{t("days.friday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive={isActive("saturday")}>
					<Text color="$trueGray400">{t("days.saturday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive={isActive("sunday")}>
					<Text color="$trueGray400">{t("days.sunday").substring(0, 2)}</Text>
				</Circle>
			</Bar>
		</Head>
	);
};
