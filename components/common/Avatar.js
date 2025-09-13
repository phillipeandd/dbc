import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

const Avatar = ({
  source,
  size = 'medium',
  name,
  onPress,
  editable = false,
  style,
}) => {
  const { theme } = useTheme();

  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
    xlarge: 120,
  };

  const avatarSize = sizeMap[size];

  const containerStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: theme.colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  };

  const imageStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  };

  const fallbackTextStyle = {
    fontSize: avatarSize * 0.4,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.secondary,
  };

  const editIconStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary[500],
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={[containerStyle, style]} onPress={onPress}>
      {source ? (
        <Image source={source} style={imageStyle} resizeMode="cover" />
      ) : (
        <Text style={fallbackTextStyle}>{getInitials(name)}</Text>
      )}
      {editable && (
        <View style={editIconStyle}>
          <MaterialCommunityIcons
            name="camera"
            size={12}
            color={theme.colors.text.inverse}
          />
        </View>
      )}
    </Component>
  );
};

export default Avatar;