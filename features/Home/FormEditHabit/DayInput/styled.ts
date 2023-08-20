import { Platform } from "react-native";
import { styled } from "styled-components/native";

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

interface Props {
	status: string;
}

export const Btn = styled.TouchableOpacity<Props>`
    width: 40px;
    aspect-ratio: 1;
    border-radius: 60px;
    opacity: ${({ status }) => (status === "checked" ? 1 : 0.3)};
`;

export const Crd = styled.View<Props>`
    width: 100%;
    height: 100%;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.box};
    opacity: ${({ status }) =>
			Platform.OS === "android" ? (status === "checked" ? 1 : 0.5) : 1};
`;
