import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "styled-components/native";

export const Body = styled(SafeAreaView)`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 16px;
`;
