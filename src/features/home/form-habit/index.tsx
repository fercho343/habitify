import { ColorButton } from "@/src/components/color-button";
import { IconButton } from "@/src/components/icon-button";
import { Switch } from "@/src/components/switch";
import { TextInput } from "@/src/components/text-input";
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
import { t } from "i18next";
import { useForm } from "react-hook-form";

export const FormHabit = () => {
	const toast = useToast();
	const { control, handleSubmit } = useForm({
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

		// router.back();

		await toast.show({
			placement: "bottom",
			render: ({ id }) => {
				const toastId = `toast-${id}`;
				return (
					<Toast  nativeID={toastId} action="success" variant="solid" rounded='$full'>
						<VStack space="xs">
							<ToastDescription>
								Su habito se anadio con exito
							</ToastDescription>
						</VStack>
					</Toast>
				);
			},
		});
	};

	return (
		<ScrollView px={16} mt={10}>
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

			<Switch label={t("requiresGoal")} />

			<Divider mb={15} />

			<Switch label={t("hasReminder")} />

			<Button borderRadius="$full" onPress={handleSubmit(onSubmit)}>
				<ButtonText color="$background">{t("add")}</ButtonText>
			</Button>
		</ScrollView>
	);
};
