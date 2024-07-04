import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, Text} from 'react-native';
import {defaultTheme} from '../../../theme';
import {createStyles, Sizes, Variants} from './styles';

type Spacing = keyof typeof defaultTheme.spacing;

type Props = {
  size?: keyof typeof Sizes;
  variant?: Variants;
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  marginTop?: Spacing | 'none';
  marginBottom?: Spacing | 'none';
  marginLeft?: Spacing | 'none';
  marginRight?: Spacing | 'none';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: ReactNode;
};

const getDefautlMarginBottom = (size: keyof typeof Sizes) => {
  switch (size) {
    case 'h1':
      return 'xxxl';
    case 'h2':
      return 'xxl';
    case 'h3':
      return 'xl';
    default:
      return 'lg';
  }
};

export const Typography = ({
  size = 'body',
  bold = false,
  style,
  children,
  variant = 'default',
  marginTop = 'none',
  marginBottom = 'none',
  marginLeft = 'none',
  marginRight = 'none',
  textAlign = 'auto',
  ...rest
}: Props) => {
  const {spacing} = defaultTheme;

  let defaultMarginBottom = 0;
  if (marginBottom === 'none') {
    defaultMarginBottom = 0;
  } else if (marginBottom) {
    defaultMarginBottom = spacing[marginBottom];
  } else {
    defaultMarginBottom = spacing[getDefautlMarginBottom(size)];
  }

  const styles = createStyles({
    size,
    bold,
    marginBottom: defaultMarginBottom,
    marginTop: marginTop === 'none' ? 0 : spacing[marginTop],
    marginLeft: marginLeft === 'none' ? 0 : spacing[marginLeft],
    marginRight: marginRight === 'none' ? 0 : spacing[marginRight],
    variant,
    textAlign,
  });

  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};
