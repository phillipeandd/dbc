import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Typography, Avatar, Button } from '../common';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../src/context/AuthProvider';
import { USER_ROLES } from '../../utils/constants';

const DrawerContent = memo((props) => {
  const { theme } = useTheme();
  const { navigation } = props;
  const {
    userLogout,
    companyLogout,
    roleOf,
    firstName,
    showEmail,
    showImage,
    themeIds,
    handleClickVibration,
  } = useAuth();

  const getThemeScreen = (themeId) => {
    const themeMap = {
      '1': 'UserTheme1',
      '2': 'UserTheme2',
      '3': 'UserTheme3',
      '4': 'UserTheme4',
      '5': 'UserTheme5',
      '6': 'UserTheme6',
    };
    return themeMap[themeId] || 'My Card';
  };

  const handleLogout = async () => {
    handleClickVibration();
    if (roleOf === USER_ROLES.ADMIN) {
      companyLogout();
    } else {
      userLogout();
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root', state: { routes: [{ name: 'Landing Screen' }] } }],
    });
  };

  const drawerStyle = {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  };

  const headerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  };

  const userInfoStyle = {
    marginLeft: theme.spacing.md,
  };

  const dividerStyle = {
    height: 1,
    backgroundColor: theme.colors.neutral[200],
    marginVertical: theme.spacing.md,
  };

  const logoutContainerStyle = {
    marginTop: 'auto',
    paddingTop: theme.spacing.lg,
  };

  if (roleOf === USER_ROLES.SELF_EMPLOYED || roleOf === USER_ROLES.EMPLOYEE) {
    return (
      <DrawerContentScrollView {...props} style={drawerStyle}>
        {/* User Header */}
        <View style={headerStyle}>
          <Avatar
            source={showImage ? { uri: `https://bc.exploreanddo.com/${showImage}` } : null}
            name={firstName}
            size="large"
          />
          <TouchableOpacity
            onPress={() => {
              handleClickVibration();
              navigation.closeDrawer();
            }}
          >
            <MaterialIcons name="close" size={28} color={theme.colors.primary[500]} />
          </TouchableOpacity>
        </View>

        <View style={userInfoStyle}>
          <Typography variant="h4" weight="bold" color="primary">
            {firstName}
          </Typography>
          <Typography variant="body" color="secondary">
            {showEmail}
          </Typography>
        </View>

        <View style={dividerStyle} />

        {/* Navigation Items */}
        <DrawerItem
          label="My Card"
          labelStyle={{ color: theme.colors.primary[500] }}
          icon={({ size }) => (
            <FontAwesome name="dot-circle-o" size={24} color={theme.colors.primary[500]} />
          )}
          onPress={() => {
            handleClickVibration();
            navigation.navigate(getThemeScreen(themeIds));
          }}
        />

        <DrawerItem
          label="Analytics"
          labelStyle={{ color: theme.colors.primary[500] }}
          icon={({ size }) => (
            <FontAwesome name="check" size={24} color={theme.colors.primary[500]} />
          )}
          onPress={() => {
            handleClickVibration();
            navigation.navigate('Analytics');
          }}
        />

        <DrawerItem
          label="Scan"
          labelStyle={{ color: theme.colors.primary[500] }}
          icon={({ size }) => (
            <MaterialCommunityIcons name="qrcode-scan" size={24} color={theme.colors.primary[500]} />
          )}
          onPress={() => {
            handleClickVibration();
            navigation.navigate('Scanner');
          }}
        />

        <DrawerItem
          label="Contact Support"
          labelStyle={{ color: theme.colors.primary[500] }}
          icon={({ size }) => (
            <FontAwesome name="plus" size={20} color={theme.colors.primary[500]} />
          )}
          onPress={() => {
            handleClickVibration();
            navigation.navigate('Contact Support');
          }}
        />

        {/* Logout */}
        <View style={logoutContainerStyle}>
          <View style={dividerStyle} />
          <DrawerItem
            label="Logout"
            labelStyle={{ color: theme.colors.error[500] }}
            icon={({ size }) => (
              <MaterialIcons name="logout" size={24} color={theme.colors.error[500]} />
            )}
            onPress={handleLogout}
          />
        </View>
      </DrawerContentScrollView>
    );
  }

  // Admin drawer content
  if (roleOf === USER_ROLES.ADMIN) {
    return (
      <DrawerContentScrollView {...props} style={drawerStyle}>
        {/* Admin Header */}
        <View style={[headerStyle, { flexDirection: 'row-reverse' }]}>
          <Avatar
            source={showImage ? { uri: `https://bc.exploreanddo.com/${showImage}` } : null}
            name={firstName}
            size="large"
          />
          <TouchableOpacity
            onPress={() => {
              handleClickVibration();
              navigation.closeDrawer();
            }}
          >
            <MaterialIcons name="close" size={28} color={theme.colors.primary[500]} />
          </TouchableOpacity>
        </View>

        <View style={userInfoStyle}>
          <Typography variant="h4" weight="bold" color="primary">
            {firstName}
          </Typography>
          <Typography variant="body" color="secondary">
            {showEmail}
          </Typography>
        </View>

        <View style={dividerStyle} />

        {/* Admin Navigation Items */}
        <DrawerItem
          label="Home"
          labelStyle={{ color: theme.colors.primary[500] }}
          icon={({ size }) => (
            <FontAwesome name="dot-circle-o" size={24} color={theme.colors.primary[500]} />
          )}
          onPress={() => navigation.navigate('Admin Home')}
        />

        <DrawerItem
          label="Add Profile"
          labelStyle={{ color: theme.colors.primary[500] }}
          icon={({ size }) => (
            <FontAwesome name="plus" size={20} color={theme.colors.primary[500]} />
          )}
          onPress={() => navigation.navigate('Add User')}
        />

        <DrawerItem
          label="Settings"
          labelStyle={{ color: theme.colors.primary[500] }}
          icon={({ size }) => (
            <MaterialIcons name="settings" size={20} color={theme.colors.primary[500]} />
          )}
        />

        {/* Logout */}
        <View style={logoutContainerStyle}>
          <View style={dividerStyle} />
          <DrawerItem
            label="Logout"
            labelStyle={{ color: theme.colors.error[500] }}
            icon={({ size }) => (
              <MaterialIcons name="logout" size={24} color={theme.colors.error[500]} />
            )}
            onPress={handleLogout}
          />
        </View>
      </DrawerContentScrollView>
    );
  }

  return null;
});

export default DrawerContent;