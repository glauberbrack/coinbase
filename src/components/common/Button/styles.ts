import {StyleSheet, ViewStyle} from 'react-native';
import {defaultTheme} from '../../../theme';

const BUTTON_HEIGHT_FIXED = 55;

export type Variants = 'default' | 'light' | 'transparent';

type CreateStylesProps = {
  width: string;
  disabled?: boolean;
  variant: Variants;
  marginBottom: number;
  marginTop: number;
  marginLeft: number;
  marginRight: number;
};

const getBackground = (
  theme: typeof defaultTheme,
  variant: Variants,
): string => {
  const colors = {
    default: theme.button.default,
    light: theme.button.light,
    transparent: 'transparent',
  };

  return colors[variant];
};

export const createStyles = ({
  width,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  variant,
  disabled,
}: CreateStylesProps) => {
  return StyleSheet.create({
    wrapper: {
      width,
      height: BUTTON_HEIGHT_FIXED,
      backgroundColor: getBackground(defaultTheme, variant),
      opacity: disabled ? 0.5 : 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: defaultTheme.borderRadius.ls,
      marginBottom,
      marginTop,
      marginLeft,
      marginRight,
    } as ViewStyle,
  });
};
