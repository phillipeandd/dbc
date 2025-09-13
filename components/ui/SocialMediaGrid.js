import React, { memo } from 'react';
import { View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useResponsive } from '../../hooks/useResponsive';
import { SOCIAL_MEDIA_TYPES } from '../../utils/constants';
import { openURL } from '../../utils/helpers';

const SocialMediaGrid = memo(({ socialData, onSocialPress }) => {
  const { theme } = useTheme();
  const { isTablet } = useResponsive();

  const imageSources = {
    whatsapp: require('../../assets/social/whatsapp.gif'),
    instagram: require('../../assets/social/instagram.gif'),
    twitter: require('../../assets/social/twitter.gif'),
    linkedIn: require('../../assets/social/linkedin.gif'),
    youtube: require('../../assets/social/youtube.gif'),
    facebook: require('../../assets/social/facebook.gif'),
    skype: require('../../assets/social/icons8-skype-48.png'),
    telegram: require('../../assets/social/icons8-telegram-48.png'),
    tiktok: require('../../assets/social/tiktok.gif'),
    behance: require('../../assets/social/icons8-behance-48.png'),
    discord: require('../../assets/social/discord.gif'),
    reddit: require('../../assets/social/icons8-reddit-48.png'),
  };

  const filteredSocialData = SOCIAL_MEDIA_TYPES
    .filter(type => {
      const value = socialData?.[type];
      return value && value !== 'null' && value !== '';
    })
    .map(type => ({ type, value: socialData[type] }));

  const renderSocialItem = ({ item }) => {
    const { type, value } = item;
    const imageSource = imageSources[type];

    const itemStyle = {
      margin: theme.spacing.sm,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.sm,
    };

    const imageStyle = {
      width: isTablet ? 40 : 30,
      height: isTablet ? 40 : 30,
    };

    return (
      <TouchableOpacity
        style={itemStyle}
        onPress={() => onSocialPress?.(type, value)}
      >
        <Image source={imageSource} style={imageStyle} />
      </TouchableOpacity>
    );
  };

  if (filteredSocialData.length === 0) {
    return null;
  }

  const containerStyle = {
    marginVertical: theme.spacing.lg,
  };

  return (
    <View style={containerStyle}>
      <FlatList
        data={filteredSocialData}
        renderItem={renderSocialItem}
        keyExtractor={(item) => item.type}
        numColumns={isTablet ? 6 : 4}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        scrollEnabled={false}
      />
    </View>
  );
});

export default SocialMediaGrid;