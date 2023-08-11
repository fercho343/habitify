import { styled } from "styled-components/native";

export const Body = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 10px;
  padding: 10px;
  flex-direction: row;
  margin-bottom: 16px;
`;

interface IconProps {
	$color: string;
}

export const Icon = styled.View<IconProps>`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $color }) => $color};
  border-radius: 50px;
  margin-right: 10px;
`;

export const Content = styled.View`
  width: 80%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Separation = styled.View`
  width: 2px;
  background-color: ${({ theme }) => theme.colors.background};
  height: 30px;
`;

export const Controls = styled.View`
  width: 90px;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.box};
  border-radius: 50px;
  flex-direction: row;
  justify-content: space-between;
`;
