import { ItemTabBarType } from "@/types/styled";
import { styled } from "styled-components/native";

export const Bar = styled.View`
  width: 90%;
  background-color: purple;
  height: 60px;
  position: absolute;
  bottom: 25px;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
`;

export const Item = styled.TouchableOpacity<ItemTabBarType>`
  background-color: ${({ theme, $isActive }) =>
		$isActive ? theme.colors.primary : "transparent"};
  border-radius: 50px;
  padding: 5px 10px;
  flex-direction: row;
  align-items: center;
  width: 33.3%;
  justify-content: center;
`;

export const Label = styled.Text<ItemTabBarType>`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.background};
  margin-left: 5px;
  display: ${({ $isActive }) => ($isActive ? "flex" : "none")};
`;
