import { AntDesign } from "@expo/vector-icons";
import { styled } from "styled-components/native";

export const Box = styled.View`
  width: 100%;
  margin-top: 20px;
`;

export const Bar = styled.View`
  width: 100%;
  padding: 0 10px 16px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const Icon = styled(AntDesign)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const ItemBody = styled.View`
  width: 14.28%;
  align-items: center;
`;
