import { styled } from "styled-components/native";

export const Body = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

interface BoxProps {
	$isOpen: boolean;
}

export const Box = styled.View<BoxProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 10px;
  border-top-right-radius: ${({ $isOpen }) => ($isOpen ? "0" : "10px")};
  border-bottom-right-radius: ${({ $isOpen }) => ($isOpen ? "0" : "10px")};
  padding: 10px;
  flex-direction: row;
  align-items: center;
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
  width: 50px;
  height: 50px;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.box};
  border-radius: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SwipContent = styled.TouchableOpacity`
    aspect-ratio: 1;
    justify-content: center;
    align-items: center;
`;

export const SwipDelete = styled(SwipContent)`
  background-color: ${({ theme }) => theme.colors.error};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const SwipEdit = styled(SwipContent)`
  background-color: ${({ theme }) => theme.colors.info};
`;
