import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const Typography = ({
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight = 'normal',
  children,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantStyle = () => {
    const variants = {
      h1: {
        fontSize: theme.typography.fontSize['4xl'],
        lineHeight: theme.typography.lineHeight['4xl'],
        fontWeight: theme.typography.fontWeight.bold,
      },
      h2: {
        fontSize: theme.typography.fontSize['3xl'],
        lineHeight: theme.typography.lineHeight['3xl'],
        fontWeight: theme.typography.fontWeight.bold,
      },
      h3: {
        fontSize: theme.typography.fontSize['2xl'],
        lineHeight: theme.typography.lineHeight['2xl'],
        fontWeight: theme.typography.fontWeight.semibold,
      },
      h4: {
        fontSize: theme.typography.fontSize.xl,
        lineHeight: theme.typography.lineHeight.xl,
        fontWeight: theme.typography.fontWeight.semibold,
      },
      h5: {
        fontSize: theme.typography.fontSize.lg,
        lineHeight: theme.typography.lineHeight.lg,
        fontWeight: theme.typography.fontWeight.medium,
      },
      h6: {
        fontSize: theme.typography.fontSize.base,
        lineHeight: theme.typography.lineHeight.base,
        fontWeight: theme.typography.fontWeight.medium,
      },
      body: {
        fontSize: theme.typography.fontSize.base,
        lineHeight: theme.typography.lineHeight.base,
        fontWeight: theme.typography.fontWeight.normal,
      },
      caption: {
        fontSize: theme.typography.fontSize.sm,
        lineHeight: theme.typography.lineHeight.sm,
        fontWeight: theme.typography.fontWeight.normal,
      },
      small: {
        fontSize: theme.typography.fontSize.xs,
        lineHeight: theme.typography.lineHeight.xs,
        fontWeight: theme.typography.fontWeight.normal,
      },
    };

    return variants[variant] || variants.body;
  };

  const getColorStyle = () => {
    const colors = {
      primary: theme.colors.text.primary,
      secondary: theme.colors.text.secondary,
      disabled: theme.colors.text.disabled,
      inverse: theme.colors.text.inverse,
      success: theme.colors.success[600],
      warning: theme.colors.warning[600],
      error: theme.colors.error[600],
    };

    return { color: colors[color] || theme.colors.text.primary };
  };

  const getWeightStyle = () => {
    return {
      fontWeight: theme.typography.fontWeight[weight] || theme.typography.fontWeight.normal,
    };
  };

  const textStyle = [
    getVariantStyle(),
    getColorStyle(),
    getWeightStyle(),
    { textAlign: align },
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

export default Typography;