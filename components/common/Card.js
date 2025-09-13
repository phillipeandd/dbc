import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const Card = ({ 
  children, 
  style, 
  padding = 'md',
  shadow = 'md',
  borderRadius = 'lg',
  ...props 
}) => {
  const { theme } = useTheme();

  const cardStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius[borderRadius],
    padding: theme.spacing[padding],
    ...theme.shadows[shadow],
  };

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;