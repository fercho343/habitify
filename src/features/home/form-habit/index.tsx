import { ColorButton } from "@/src/components/color-button";
import { IconButton } from "@/src/components/icon-button";
import { Switch } from "@/src/components/switch";
import { TextInput } from "@/src/components/text-input";
import { TimeImput } from "@/src/components/time-input";
import {
	Button,
	ButtonText,
	Divider,
	HStack,
	ScrollView,
	Toast,
	ToastDescription,
	VStack,
	useToast,
} from "@gluestack-ui/themed";
import { NotificationFeedbackType, notificationAsync } from "expo-haptics";
import { t } from "i18next";
import { toLower } from "lodash";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

export const FormHabit = () => {
	const toast = useToast();
	const { control, watch, handleSubmit } = useForm({
		defaultValues: {
			name: "",
			description: "",
			icon: "",
			color: "#ffffff",
			requiresGoal: false,
			hasReminder: true,
		},
	});

	const onSubmit = async (data: any) => {
		console.log(data);

		await toast.show({
			placement: "bottom",
			render: ({ id }) => {
				notificationAsync(NotificationFeedbackType.Success);
				const toastId = `toast-${id}`;
				return (
					<TouchableOpacity onPress={() => toast.close(id)}>
						<Toast
							nativeID={toastId}
							action="success"
							variant="solid"
							rounded="$full"
						>
							<VStack space="xs">
								<ToastDescription>
									El habito {toLower(data.name)} se anadio con exito
								</ToastDescription>
							</VStack>
						</Toast>
					</TouchableOpacity>
				);
			},
		});
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

			<Switch control={control} name={"hasReminder"} label={t("hasReminder")} />

			{watch("hasReminder") && <TimeImput />}

			<Button borderRadius="$full" onPress={handleSubmit(onSubmit)}>
				<ButtonText color="$background">{t("add")}</ButtonText>
			</Button>
		</ScrollView>
	);
};
