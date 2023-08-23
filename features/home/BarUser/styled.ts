import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { styled } from "styled-components/native";

export const Bar = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserBox = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled(Image)`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50px;
  margin-right: 16px;
`;

export const IconButton = styled(TouchableOpacity)`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;
