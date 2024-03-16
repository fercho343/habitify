import {
    Button,
    ButtonIcon,
    EditIcon,
    Heading,
    Text,
} from "@gluestack-ui/themed";
import { t } from "i18next";
import { Bar, Circle, Head } from "./header.styled";

export const Header = () => {
	return (
		<Head backgroundColor="purple">
			<Bar>
				<Circle isActive>
					<Text>📚</Text>
				</Circle>

				<Button
					w={45}
					h={45}
					rounded="$full"
					variant="solid"
					bg="$background"
					sx={{
						":active": {
							opacity: 0.6,
						},
					}}
				>
					<ButtonIcon as={EditIcon} />
				</Button>
			</Bar>

			<Heading size="2xl" mt={16}>
				Leer un libro
			</Heading>

			<Bar mt={16}>
				<Circle isActive>
					<Text>{t("days.monday").substring(0, 2)}</Text>
				</Circle>

				<Circle>
					<Text>{t("days.tuesday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive>
					<Text>{t("days.wednesday").substring(0, 2)}</Text>
				</Circle>

				<Circle>
					<Text>{t("days.thursday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive>
					<Text>{t("days.friday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive>
					<Text>{t("days.saturday").substring(0, 2)}</Text>
				</Circle>

				<Circle isActive>
					<Text>{t("days.sunday").substring(0, 2)}</Text>
				</Circle>
			</Bar>
		</Head>
	);
};
