import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Typography, Card } from '../common';
import { useTheme } from '../../hooks/useTheme';
import { useResponsive } from '../../hooks/useResponsive';
import { openURL } from '../../utils/helpers';

const ContactInfo = memo(({ userData, companyData, style }) => {
  const { theme } = useTheme();
  const { isTablet } = useResponsive();

  const contactItems = [
    {
      icon: 'phone',
      label: 'Phone',
      value: userData?.phone || companyData?.phone,
      action: (value) => openURL(`tel:${value}`, 'Unable to make phone call'),
    },
    {
      icon: 'email',
      label: 'Email',
      value: userData?.email || companyData?.email,
      action: (value) => openURL(`mailto:${value}`, 'Unable to open email client'),
    },
    {
      icon: 'web',
      iconComponent: MaterialCommunityIcons,
      label: 'Website',
      value: companyData?.website,
      action: (value) => openURL(value, 'Unable to open website'),
    },
    {
      icon: 'location-on',
      label: 'Location',
      value: userData?.user_details?.address || companyData?.address,
      action: (value) => {
        const encodedAddress = encodeURIComponent(value);
        openURL(`https://maps.google.com/?q=${encodedAddress}`, 'Unable to open maps');
      },
    },
  ];

  const containerStyle = {
    flexDirection: isTablet ? 'row' : 'column',
    gap: theme.spacing.md,
    ...style,
  };

  const itemStyle = {
    flex: isTablet ? 1 : undefined,
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  };

  const iconStyle = {
    marginBottom: theme.spacing.sm,
  };

  return (
    <View style={containerStyle}>
      {contactItems.map((item, index) => {
        if (!item.value) return null;

        const IconComponent = item.iconComponent || MaterialIcons;

        return (
          <TouchableOpacity
            key={index}
            style={itemStyle}
            onPress={() => item.action?.(item.value)}
          >
            <IconComponent
              name={item.icon}
              size={24}
              color={theme.colors.primary[500]}
              style={iconStyle}
            />
            <Typography variant="caption" color="secondary" align="center">
              {item.label}
            </Typography>
            <Typography variant="body" weight="medium" align="center">
              {item.value}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default ContactInfo;