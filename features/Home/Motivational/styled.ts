import { styled } from "styled-components/native";

export const Box = styled.View`
  width: 100%;
  margin-top: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 10px;
`;
