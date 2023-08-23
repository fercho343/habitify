import { styled } from "styled-components/native";

interface ColorButtonProps {
	$value: string;
}

export const ColorBtn = styled.TouchableOpacity<ColorButtonProps>`
  width: 45px;
  height: 45px;
  background-color: ${({ $value }) => $value};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 5px ${({ theme }) => theme.colors.box};
  margin-top: 2px;
`;
