import { styled } from "styled-components/native";

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const Item = styled.TouchableOpacity`
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.box};
  border-radius: 50px;
`;

interface PropsInput {
	$error: boolean;
}

export const GoalInput = styled.TextInput<PropsInput>`
  min-width: 70px;
  background-color: ${({ theme }) => theme.colors.box};
  border-radius: 50px;
  padding: 5px 10px;
  font-size: ${({ theme }) => theme.fontSize.body}px;
  color: ${({ theme }) => theme.colors.text};
  border: 1px ${({ $error, theme }) =>
		$error ? theme.colors.error : "transparent"};
`;

export const MeterInput = styled.TouchableOpacity<PropsInput>`
  background-color: ${({ theme }) => theme.colors.box};
  border-radius: 50px;
  padding: 5px 10px;
  min-width: 40px;
  border: 1px ${({ $error, theme }) =>
		$error ? theme.colors.error : "transparent"};
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
