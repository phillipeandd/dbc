import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const SafeAreaWrapper = ({ children, style, statusBarStyle = 'dark-content' }) => {
  const { theme } = useTheme();

  const safeAreaStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
  };

  return (
    <SafeAreaView style={[safeAreaStyle, style]}>
      <StatusBar
        barStyle={theme.isDarkMode ? 'light-content' : statusBarStyle}
        backgroundColor={Platform.OS === 'android' ? theme.colors.primary[500] : undefined}
      />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;