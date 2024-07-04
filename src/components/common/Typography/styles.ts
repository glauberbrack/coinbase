import {StyleSheet, TextStyle} from 'react-native';
import {defaultTheme} from '../../../theme';

export type Variants =
  | 'default'
  | 'white'
  | 'light'
  | 'dark'
  | 'link'
  | 'error'
  | 'success'
  | 'placeholder';

export const Sizes = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'body',
  medium: 'medium',
  small: 'small',
  min: 'min',
};

const fontSizes = {
  h1: defaultTheme.fontSizes.h1,
  h2: defaultTheme.fontSizes.h2,
  h3: defaultTheme.fontSizes.h3,
  h4: defaultTheme.fontSizes.h4,
  body: defaultTheme.fontSizes.body,
  medium: defaultTheme.fontSizes.medium,
  small: defaultTheme.fontSizes.small,
  min: defaultTheme.fontSizes.min,
};

const getVariantColor = (variant: Variants) => {
  switch (variant) {
    case 'default':
      return defaultTheme.text.default;
    case 'white':
      return defaultTheme.text.white;
    case 'light':
      return defaultTheme.text.light;
    case 'dark':
      return defaultTheme.text.dark;
    case 'link':
      return defaultTheme.text.link;
    case 'placeholder':
      return defaultTheme.text.placeholder;
    case 'error':
      return defaultTheme.ui.error;
    case 'success':
      return defaultTheme.ui.success;
    default:
      return defaultTheme.text.default;
  }
};

type CreateStylesProps = {
  size: keyof typeof Sizes;
  bold: boolean;
  marginBottom: number;
  marginTop: number;
  marginLeft: number;
  marginRight: number;
  variant: Variants;
  textAlign: TextStyle['textAlign'];
  underlined?: boolean;
  lineHeight?: number;
};

export const createStyles = ({
  size,
  bold,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  variant,
  textAlign,
  underlined,
  lineHeight,
}: CreateStylesProps) => {
  return StyleSheet.create({
    text: {
      fontSize: fontSizes[size],
      fontWeight: bold ? '700' : '400',
      color: getVariantColor(variant),
      marginBottom,
      marginTop,
      marginLeft,
      marginRight,
      textAlign,
      textDecorationLine: underlined ? 'underline' : 'none',
      lineHeight: lineHeight ? lineHeight * fontSizes[size] : undefined,
    } as TextStyle,
  });
};
