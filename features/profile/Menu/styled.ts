import { styled } from "styled-components/native";

export const Body = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 16px;
`;

export const Content = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.box};
  margin-bottom: 16px;
  justify-content: space-between;
  padding-right: 16px;
  position: relative;
`;

export const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.box};
  border-radius: 5px;
  margin-bottom: 16px;
  padding: 0 12px;
`;

export const IconContent = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 99px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Point = styled.View`
  width: 15px;
  height: 15px;
  background-color: ${({ theme }) => theme.colors.background};
  position: absolute;
  top: 18px;
  right: 16px;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.View<StatusType>`
  width: 80%;
  height: 80%;
  background-color: ${({ $haveUpdate, theme }) =>
		$haveUpdate ? theme.colors.primary : theme.colors.error};
  border-radius: 99px;
`;

interface StatusType {
	$haveUpdate: boolean;
}
