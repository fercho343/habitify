import { AntDesign } from "@expo/vector-icons";
import { styled } from "styled-components/native";

export const Bar = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 10px 16px;
  align-items: center;
`;

export const Icon = styled(AntDesign)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 25px;
`;

export const TitleContext = styled.View`
  width: 90%;
`;

export const Body = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CameraContent = styled.View`
  width: 80%;
  aspect-ratio: 1;
  border-radius: 10000px;
  overflow: hidden;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 10px ;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 40px;
  margin-top: 20px;
  align-items: center;
`;
