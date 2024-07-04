import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';

import {defaultTheme} from '../../../theme';

import {Typography} from '../Typography';
import {createStyles, Variants} from './styles';

type Spacing = keyof typeof defaultTheme.spacing;

type Props = {
  text: string;
  onPress(): void;
  variant?: Variants;
  marginTop?: Spacing | 'none';
  marginBottom?: Spacing | 'none';
  marginLeft?: Spacing | 'none';
  marginRight?: Spacing | 'none';
  width?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

export const Button = ({
  text,
  onPress,
  variant = 'default',
  marginTop = 'none',
  marginBottom = 'none',
  marginLeft = 'none',
  marginRight = 'none',
  width = '100%',
  isLoading = false,
  disabled,
  ...rest
}: Props) => {
  const {spacing} = defaultTheme;

  const getSpacing = (value: Spacing | 'none') =>
    value === 'none' ? 0 : spacing[value];

  const decideTextVariant = variant === 'default' ? 'white' : 'default';

  const styles = createStyles({
    width,
    marginTop: getSpacing(marginTop),
    marginBottom: getSpacing(marginBottom),
    marginLeft: getSpacing(marginLeft),
    marginRight: getSpacing(marginRight),
    variant,
    disabled: disabled || isLoading,
  });

  return (
    <TouchableOpacity
      style={styles.wrapper}
      disabled={disabled || isLoading}
      onPress={onPress}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Typography variant={decideTextVariant}>{text}</Typography>
      )}
    </TouchableOpacity>
  );
};
