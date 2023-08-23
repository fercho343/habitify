import { styled } from "styled-components/native";

export const Body = styled.View`
  width: 100%;
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;
