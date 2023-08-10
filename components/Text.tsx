import styled, { DefaultTheme } from "styled-components/native";

const defaultTextStyles = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPaw};
  color: ${theme.colors.text};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const headline_large = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPawBold};
  font-size: ${theme.fontSize.headlineLarge}px;
`;

const headline_medium = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPawBold};
  font-size: ${theme.fontSize.headlineMedium}px;
`;

const headline_small = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPawSemiBold};
  font-size: ${theme.fontSize.headlineMedium}px;
`;

const subtitle_large = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPawBold};
  font-size: ${theme.fontSize.subtitle}px;
`;

const subtitle_medium = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPawSemiBold};
  font-size: ${theme.fontSize.subtitle}px;
`;

const subtitle_small = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPaw};
  font-size: ${theme.fontSize.subtitle}px;
`;

const body_large = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPawBold};
  font-size: ${theme.fontSize.body}px;
`;

const body_medium = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPawSemiBold};
  font-size: ${theme.fontSize.body}px;
`;

const body_small = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.MacPaw};
  font-size: ${theme.fontSize.body}px;
`;

const variants = {
	headline_large,
	headline_medium,
	headline_small,
	subtitle_large,
	subtitle_medium,
	subtitle_small,
	body_large,
	body_medium,
	body_small,
};

interface TextProps {
	variant?: keyof typeof variants;
	theme: DefaultTheme;
}

export const Text = styled.Text<TextProps>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant as keyof typeof variants](theme)}
`;

Text.defaultProps = {
	variant: "body_small",
};
