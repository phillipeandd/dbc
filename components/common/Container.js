import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useResponsive } from '../../hooks/useResponsive';

const Container = ({ 
  children, 
  style, 
  padding = true,
  center = false,
  ...props 
}) => {
  const { theme } = useTheme();
  const { isTablet } = useResponsive();

  const containerStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: padding ? (isTablet ? theme.spacing['2xl'] : theme.spacing.md) : 0,
    paddingVertical: padding ? theme.spacing.md : 0,
    ...(center && {
      justifyContent: 'center',
      alignItems: 'center',
    }),
  };

  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default Container;