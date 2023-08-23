import { styled } from "styled-components/native";

interface InputType {
	$isSelected: boolean;
	$error: boolean;
}

interface HelperType {
	$error: boolean;
}

export const Row = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

export const Input = styled.TextInput<InputType>`
  width: 100%;
  border-bottom-color: ${({ theme, $isSelected, $error }) =>
		$error
			? theme.colors.error
			: $isSelected
			? theme.colors.primary
			: theme.colors.text};
  border-bottom-width: 1px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  padding: 5px 2px;
  font-family: ${({ theme }) => theme.fonts.MacPaw};
`;

export const HelperText = styled.Text<HelperType>`
  margin-left: 10px;
  color: ${({ theme, $error }) =>
		$error ? theme.colors.error : theme.colors.text};
`;
