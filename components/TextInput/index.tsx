import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextInput as DefaultTextField } from "react-native";
import { useTheme } from "styled-components/native";
import { HelperText, Input, Row } from "./styled";

interface CustomInputProps {
	control: any;
	rules?: object;
	name: string;
}

export type TextInputProps = CustomInputProps & DefaultTextField["props"];

//@ts-ignore
export const TextInput = (props: TextInputProps) => {
	const theme = useTheme();
	const { control, rules, name, ...otherProps } = props;
	const [isSelected, setIsSelected] = useState(false);

	return (
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
	);
};
