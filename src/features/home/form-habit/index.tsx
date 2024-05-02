import { ColorButton } from "@/src/components/color-button";
import { FrequencieButtons } from "@/src/components/frequencie-buttons";
import { IconButton } from "@/src/components/icon-button";
import { Switch } from "@/src/components/switch";
import { TextInput } from "@/src/components/text-input";
import { TimeImput } from "@/src/components/time-input";
import { createHabit } from "@/src/services/db/habits";
import { HabitForm } from "@/src/types/habit";
import {
	Button,
	ButtonText,
	Divider,
	HStack,
	ScrollView, useToast
} from "@gluestack-ui/themed";
import { useSQLiteContext } from "expo-sqlite/next";
import { t } from "i18next";
import { useForm } from "react-hook-form";

export const FormHabit = () => {
	const db = useSQLiteContext();
	const toast = useToast();

	const { control, watch, handleSubmit } = useForm<HabitForm>({
		defaultValues: {
			name: "",
			description: "",
			icon: "",
			color: "#ffffff",
			goalAmount: 0,
			requiresGoal: false,
			measureUnit: "",
			frequency: [
				"monday",
				"tuesday",
				"wednesday",
				"thursday",
				"friday",
				"saturday",
				"sunday",
			],
			hasReminder: true,
			startTime: "00:00"
		},
	});

	const onSubmit = async (data: HabitForm) => {

		await createHabit(db, data)

		// toast.show({
		// 	placement: "bottom",
		// 	render: ({ id }) => {
		// 		notificationAsync(NotificationFeedbackType.Success);
		// 		const toastId = `toast-${id}`;
		// 		return (
		// 			<TouchableOpacity onPress={() => toast.close(id)}>
		// 				<Toast
		// 					nativeID={toastId}
		// 					action="success"
		// 					variant="solid"
		// 					rounded="$full"
		// 				>
		// 					<VStack space="xs">
		// 						<ToastDescription>
		// 							El habito {toLower(data.name)} se anadio con exito
		// 						</ToastDescription>
		// 					</VStack>
		// 				</Toast>
		// 			</TouchableOpacity>
		// 		);
		// 	},
		// });
	};

	return (
		<ScrollView mt={10}>
			<TextInput
				control={control}
				name="name"
				rules={{
					required: t("error.name"),
				}}
				label={t("name")}
				placeholder={t("placeholder.habitName")}
				isRequired
			/>

			<TextInput
				control={control}
				name="description"
				label={t("description")}
				placeholder={t("placeholder.habitDescription")}
				multiline={true}
			/>

			<HStack space="sm">
				<IconButton control={control} />
				<ColorButton control={control} />
			</HStack>

			<Divider mt={15} mb={15} />

			<Switch
				control={control}
				name={"requiresGoal"}
				label={t("requiresGoal")}
			/>

			<Divider mb={15} />

			<FrequencieButtons control={control} />

			<Switch control={control} name={"hasReminder"} label={t("hasReminder")} />

			{watch("hasReminder") && <TimeImput control={control} />}

			<Button borderRadius="$full" onPress={handleSubmit(onSubmit)}>
				<ButtonText color="$background">{t("add")}</ButtonText>
			</Button>
		</ScrollView>
	);
};
