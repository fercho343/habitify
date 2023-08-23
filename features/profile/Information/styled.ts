import { styled } from "styled-components/native";

export const Body = styled.View`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px 16px;
`;

export const Row = styled.View`
  margin-bottom: 16px;
`;
