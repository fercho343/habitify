import styled from "styled-components/native";

export const NlContent = styled.View<NvType>`
  position: absolute;
  bottom: ${({ $bottom }) => `${$bottom}px`};
  right: ${({ $right }) => `${$right}px`};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 999px;
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const NlText = styled.Text<{ $fontSize: number }>`
  font-family: Nabla;
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
`;

export interface NvType {
	$width: number;
	$height: number;
	$bottom: number;
	$right: number;
}
