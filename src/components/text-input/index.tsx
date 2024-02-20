import { FormControlErrorText } from "@gluestack-ui/themed";
import {
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
} from "@gluestack-ui/themed";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { TextInputProps } from "react-native";

export const TextInput: React.FC<Props> = (props) => {
	const { control, name, rules, label, isRequired, ...otherProps } = props;
	return (
		<>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, value }, fieldState: { error } }) => {
					return (
						<FormControl
							isRequired={isRequired}
							isInvalid={error ? true : false}
						>
							<FormControlLabel>
								<FormControlLabelText size="lg">{label}</FormControlLabelText>
							</FormControlLabel>
							<Input variant="underlined">
								<InputField
									value={value}
									onChangeText={onChange}
									{...otherProps}
								/>
							</Input>

							<FormControlErrorText>{error?.message}</FormControlErrorText>
						</FormControl>
					);
				}}
			/>
		</>
	);
};

interface PersonalizedProps {
	label: string;
	isRequired?: boolean;
	control: Control<any>;
	rules?: RegisterOptions;
	name: string;
}

type Props = PersonalizedProps & TextInputProps;
