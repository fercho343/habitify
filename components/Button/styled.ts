import { styled } from "styled-components/native";

export const ButtonContent = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  padding: 12px 10px;
  align-items: center;
  margin-top: 25px;
`;
