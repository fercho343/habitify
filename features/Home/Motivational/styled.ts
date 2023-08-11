import { styled } from "styled-components/native";

export const Box = styled.View`
  width: 100%;
  height: 120px;
  margin-top: 40px;
  overflow: hidden;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.card};
`;

export const Background = styled.ImageBackground`
  height: 120px;
  padding: 10px;
  justify-content: center;
`;
