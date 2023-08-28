import { styled } from "styled-components/native";

export const Body = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 16px;
`;

export const Row = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.box};
  /* border-radius: 5px; */
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
