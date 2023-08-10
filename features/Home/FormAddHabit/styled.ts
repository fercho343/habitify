import { styled } from "styled-components/native";

export const Form = styled.View`
  width: 100%;
  flex: 1;
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Row = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

export const Head = styled.View`
  width: 100%;
  padding: 15px 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-bottom-color: ${({ theme }) => theme.colors.disabled};
  border-bottom-width: 1px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Body = styled.View`
  width: 100%;
  flex: 1;
  padding: 10px 16px;
`;

interface IconButtonProps {
	$error?: boolean;
}

export const IconButton = styled.TouchableOpacity<IconButtonProps>`
  width: 45px;
  height: 45px;
  background-color: ${({ theme, $error }) =>
		$error ? theme.colors.error : theme.colors.box};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;
