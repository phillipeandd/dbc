import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const LoadingSpinner = ({ 
  size = 'large', 
  text, 
  style,
  color 
}) => {
  const { theme } = useTheme();

  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  };

  const textStyle = {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
  };

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator 
        size={size} 
        color={color || theme.colors.primary[500]} 
      />
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  );
};

export default LoadingSpinner;