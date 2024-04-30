import {
    Input,
    InputField,
    InputIcon,
    InputSlot,
    View,
} from "@gluestack-ui/themed";
import { t } from "i18next";
import { PencilLineIcon, SaveIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface InputType {
	name: string;
}

export const NameInput = () => {
	const [isEditable, setIsEditable] = useState<boolean>(false);

	const { control, handleSubmit } = useForm<InputType>({
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = (data: InputType) => {
		console.log(data);
		setIsEditable(false);
	};

	return (
		<View w="70%" mt="$3">
			<Controller
				control={control}
				name="name"
				rules={{ required: true }}
				render={({ field: { value, onChange }, fieldState: { invalid } }) => {
					return (
						<Input
							isReadOnly={!isEditable}
							variant="underlined"
							isInvalid={invalid}
						>
							<InputField
								placeholder={t("placeholder.name")}
								value={value}
								onChangeText={onChange}
								onSubmitEditing={handleSubmit(onSubmit)}
							/>

							{!isEditable && (
								<InputSlot onPress={() => setIsEditable(true)}>
									<InputIcon as={PencilLineIcon} size="lg" />
								</InputSlot>
							)}

							{isEditable && (
								<InputSlot onPress={handleSubmit(onSubmit)}>
									<InputIcon as={SaveIcon} size="lg" />
								</InputSlot>
							)}
						</Input>
					);
				}}
			/>
		</View>
	);
};
