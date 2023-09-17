import styled from "styled-components/native";

export const Body = styled.View`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.box};
  border-radius: 5px;
  margin-bottom: 16px;
`;
