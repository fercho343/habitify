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
