import { AntDesign } from "@expo/vector-icons";
import { t } from "i18next";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { useTheme } from "styled-components/native";
import { Row } from "./styled";

interface Props {
	name: string;
}

interface Input {
	name: string;
}

export const NameInput = ({ name }: Props) => {
	const theme = useTheme();
	const { control, handleSubmit } = useForm<Input>({
		defaultValues: {
			name: name,
		},
	});

	const [isEditable, setIsEditable] = useState(false);
	const inputRef = useRef<TextInput>(null);

	const handleOnFocus = () => {
		setIsEditable(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.blur();
			inputRef.current?.focus();
		}, 500);
	};

	const handleOnBlur = (value: string) => {
		if (value === "") {
			inputRef.current?.focus();
		}
	};

	const onSubmit = (data: Input) => {
		if (data.name !== "") {
			console.log(data);
			setIsEditable(false);
		}
	};

	return (
		<Row>
			<Controller
				name="name"
				control={control}
				rules={{
					required: t("error.name"),
				}}
				render={({ field: { onChange, value }, fieldState: { error } }) => {
					return (
						<TextInput
							ref={inputRef}
							value={value}
							onChangeText={onChange}
							editable={isEditable}
							style={{
								color: "#fff",
								fontSize: 20,
								borderBottomColor: error ? "red" : "#fff",
								borderBottomWidth: isEditable ? 2 : 0,
								maxWidth: 170,
								minWidth: 170,
								textAlign: "center",
								fontFamily: theme.fonts.MacPaw,
							}}
							onBlur={() => handleOnBlur(value)}
							blurOnSubmit={true}
							caretHidden={true}
							returnKeyType="send"
							onSubmitEditing={handleSubmit(onSubmit)}
						/>
					);
				}}
			/>
			{!isEditable && (
				<AntDesign
					name="edit"
					size={20}
					color={theme.colors.text}
					onPress={handleOnFocus}
				/>
			)}
		</Row>
	);
};
