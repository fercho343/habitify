import { Image } from "expo-image";
import { styled } from "styled-components/native";

export const Head = styled.View`
  width: 100%;
  align-items: center;
`;

export const Avatar = styled(Image)`
  width: 120px;
  height: 120px;
  border-radius: 100px;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
`;

export const BodySheet = styled.View`
  width: 100%;
  padding: 16px;
`;

export const ItemMenu = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.box};
  padding: 15px 10px;
  border-radius: 10px;
  margin-bottom: 16px;
`;
