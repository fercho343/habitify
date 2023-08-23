import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextInput as DefaultTextField } from "react-native";
import { useTheme } from "styled-components/native";
import { Text } from "../Text";
import { HelperText, Input, InputBox, Row } from "./styled";

interface CustomInputProps {
	control: any;
	label: string;
	rules?: object;
	name: string;
}

export type TextInputProps = CustomInputProps & DefaultTextField["props"];

//@ts-ignore
export const TextInput = (props: TextInputProps) => {
	const theme = useTheme();
	const { control, rules, name, label, ...otherProps } = props;
	const [isSelected, setIsSelected] = useState(false);

	return (
		<InputBox>
			<Controller
				control={control}
				rules={rules}
				render={({
					field: { onChange, onBlur, value },
					fieldState: { error },
				}) => {
					const handleOnBlur = () => {
						onBlur();
						setIsSelected(false);
					};

					return (
						<Row>
							<Text variant="subtitle_medium">{label}</Text>
							<Input
								onBlur={handleOnBlur}
								onFocus={() => setIsSelected(true)}
								onChangeText={onChange}
								value={value}
								$error={error ? true : false}
								$isSelected={isSelected}
								placeholderTextColor={theme.colors.disabled}
								autoCorrect={false}
								spellCheck={false}
								textContentType="none"
								{...otherProps}
							/>

							{error && (
								<HelperText $error={error ? true : false}>
									{error.message}
								</HelperText>
							)}
						</Row>
					);
				}}
				name={name}
			/>
		</InputBox>
	);
};
