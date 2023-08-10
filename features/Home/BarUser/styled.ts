import { Image } from "expo-image";
import { styled } from "styled-components/native";

export const Bar = styled.View`
  width: 100%;
`;

export const UserBox = styled.View`
  flex-direction: row;
`;

export const Avatar = styled(Image)`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50px;
`;
