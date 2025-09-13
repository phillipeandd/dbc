import React, { memo } from 'react';
import { View, Image, Linking } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Typography, Card, Avatar, Button } from '../common';
import { useTheme } from '../../hooks/useTheme';
import { useResponsive } from '../../hooks/useResponsive';
import { openURL, showToast } from '../../utils/helpers';

const ThemeCard = memo(({
  userData,
  socialData,
  companyData,
  onShare,
  onNFCWrite,
  themeVariant = 'default',
}) => {
  const { theme } = useTheme();
  const { isTablet } = useResponsive();

  const handlePhonePress = () => {
    const phoneNumber = userData?.phone || companyData?.phone;
    if (phoneNumber) {
      openURL(`tel:${phoneNumber}`, 'Unable to make phone call');
    }
  };

  const handleEmailPress = () => {
    const email = userData?.email || companyData?.email;
    if (email) {
      openURL(`mailto:${email}`, 'Unable to open email client');
    }
  };

  const handleWebsitePress = () => {
    const website = companyData?.website || 'https://www.google.com';
    openURL(website, 'Unable to open website');
  };

  const handleSocialPress = (type, value) => {
    const socialUrls = {
      whatsapp: `whatsapp://send?phone=${value}`,
      instagram: `instagram://user?username=${value}`,
      twitter: `twitter://user?screen_name=${value}`,
      facebook: `fb://profile/${value}`,
      linkedin: `linkedin://profile/${value}`,
      telegram: `tg://resolve?domain=${value}`,
      youtube: `youtube://channel/${value}`,
      tiktok: `tiktok://user?screen_name=${value}`,
      behance: `behance://user/${value}`,
      discord: `https://discord.com/invite/${value}`,
      skype: `skype:${value}?chat`,
      reddit: `reddit://user/${value}`,
    };

    const url = socialUrls[type];
    if (url) {
      openURL(url, `Unable to open ${type}`);
    }
  };

  const cardStyle = {
    margin: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  };

  const headerStyle = {
    flexDirection: isTablet ? 'row' : 'column',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  };

  const userInfoStyle = {
    alignItems: isTablet ? 'flex-start' : 'center',
    flex: isTablet ? 1 : undefined,
  };

  const contactRowStyle = {
    flexDirection: isTablet ? 'row' : 'column',
    gap: theme.spacing.md,
    marginVertical: theme.spacing.lg,
  };

  const contactItemStyle = {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  };

  const socialContainerStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginVertical: theme.spacing.lg,
  };

  const actionButtonsStyle = {
    flexDirection: isTablet ? 'row' : 'column',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  };

  return (
    <Card style={cardStyle}>
      {/* Header with avatar and basic info */}
      <View style={headerStyle}>
        <Avatar
          source={userData?.userImage ? { uri: `https://bc.exploreanddo.com/${userData.userImage}` } : null}
          size={isTablet ? 'large' : 'xlarge'}
          name={`${userData?.firstname || ''} ${userData?.lastname || ''}`}
        />
        
        <View style={userInfoStyle}>
          <Typography variant="h3" align={isTablet ? 'left' : 'center'} weight="bold">
            {userData?.user_details?.businessname || 
             `${userData?.firstname || ''} ${userData?.lastname || ''}`}
          </Typography>
          
          <Typography variant="body" color="secondary" align={isTablet ? 'left' : 'center'}>
            {userData?.user_details?.title || 'Professional'}
          </Typography>
          
          {companyData?.logo && (
            <Image
              source={{ uri: `https://bc.exploreanddo.com/${companyData.logo}` }}
              style={{
                width: 60,
                height: 60,
                borderRadius: theme.borderRadius.lg,
                marginTop: theme.spacing.sm,
              }}
              resizeMode="contain"
            />
          )}
          
          <Typography variant="caption" color="secondary" align={isTablet ? 'left' : 'center'}>
            {companyData?.companyname || userData?.user_details?.company_name}
          </Typography>
        </View>
      </View>

      {/* Contact Information */}
      <View style={contactRowStyle}>
        <View style={contactItemStyle}>
          <MaterialIcons 
            name="phone" 
            size={24} 
            color={theme.colors.primary[500]} 
            onPress={handlePhonePress}
          />
          <Typography variant="caption" color="secondary">Phone</Typography>
          <Typography variant="body" weight="medium">
            {userData?.phone || companyData?.phone || 'Not provided'}
          </Typography>
        </View>

        <View style={contactItemStyle}>
          <MaterialIcons 
            name="email" 
            size={24} 
            color={theme.colors.primary[500]}
            onPress={handleEmailPress}
          />
          <Typography variant="caption" color="secondary">Email</Typography>
          <Typography variant="body" weight="medium">
            {userData?.email || companyData?.email || 'Not provided'}
          </Typography>
        </View>

        <View style={contactItemStyle}>
          <MaterialCommunityIcons 
            name="web" 
            size={24} 
            color={theme.colors.primary[500]}
            onPress={handleWebsitePress}
          />
          <Typography variant="caption" color="secondary">Website</Typography>
          <Typography variant="body" weight="medium">
            {companyData?.website || 'Not provided'}
          </Typography>
        </View>
      </View>

      {/* Social Media Icons */}
      {socialData && (
        <View style={socialContainerStyle}>
          {Object.entries(socialData)
            .filter(([key, value]) => value && value !== 'null' && value !== '')
            .map(([type, value]) => (
              <Button
                key={type}
                variant="ghost"
                size="small"
                onPress={() => handleSocialPress(type, value)}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: theme.colors.neutral[100],
                }}
              >
                <MaterialCommunityIcons
                  name={type}
                  size={20}
                  color={theme.colors.primary[500]}
                />
              </Button>
            ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={actionButtonsStyle}>
        <Button
          title="Share Profile"
          variant="primary"
          onPress={onShare}
          style={{ flex: isTablet ? 1 : undefined }}
        />
        <Button
          title="Write to NFC"
          variant="outline"
          onPress={onNFCWrite}
          style={{ flex: isTablet ? 1 : undefined }}
        />
      </View>
    </Card>
  );
});

export default ThemeCard;