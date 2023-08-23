import { styled } from "styled-components/native";

export const Body = styled.View`
  width: 100%;
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.disabled};
  margin: 10px 0;
`;
