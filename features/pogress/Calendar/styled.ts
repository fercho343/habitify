import { AntDesign } from "@expo/vector-icons";
import { styled } from "styled-components/native";

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Box = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 5px;
  padding: 10px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleContent = styled.View`
  width: 14.28%;
  align-items: center;
`;

export const Icon = styled(AntDesign)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const DayContent = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const EmptyDayCell = styled.View`
  width: 14.28%;
  aspect-ratio: 1;
`;
