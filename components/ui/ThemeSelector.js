import React, { memo, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Typography, Button, LoadingSpinner } from '../common';
import { useTheme } from '../../hooks/useTheme';
import { useResponsive } from '../../hooks/useResponsive';
import { showToast } from '../../utils/helpers';

const ThemeSelector = memo(({ onThemeSelect, loading = false }) => {
  const { theme } = useTheme();
  const { isTablet } = useResponsive();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const themes = [
    { id: '2', name: 'UserTheme2', image: require('../../assets/theme/design3.jpg') },
    { id: '3', name: 'UserTheme3', image: require('../../assets/theme/design4.jpg') },
    { id: '6', name: 'UserTheme6', image: require('../../assets/theme/design2.jpg') },
  ];

  const handleThemePress = (themeData) => {
    setSelectedTheme(themeData);
    setShowModal(true);
  };

  const confirmSelection = () => {
    if (selectedTheme) {
      onThemeSelect?.(selectedTheme);
      setShowModal(false);
    }
  };

  const containerStyle = {
    alignItems: 'center',
    padding: theme.spacing.md,
  };

  const titleStyle = {
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  };

  const scrollContainerStyle = {
    paddingHorizontal: theme.spacing.md,
  };

  const themeItemStyle = {
    marginHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  };

  const themeImageStyle = {
    width: isTablet ? 200 : 150,
    height: isTablet ? 300 : 225,
  };

  const modalStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const modalContentStyle = {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    margin: theme.spacing.lg,
    ...theme.shadows.xl,
  };

  const modalButtonsStyle = {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  };

  return (
    <View style={containerStyle}>
      <Typography variant="h3" weight="bold" style={titleStyle}>
        Select your page style you want to share with your prospects and clients
      </Typography>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={scrollContainerStyle}
      >
        {themes.map((themeData) => (
          <TouchableOpacity
            key={themeData.id}
            style={themeItemStyle}
            onPress={() => handleThemePress(themeData)}
          >
            <Image source={themeData.image} style={themeImageStyle} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={modalStyle}>
          <View style={modalContentStyle}>
            <Typography variant="h4" weight="bold" align="center">
              Confirm Theme Selection
            </Typography>
            <Typography variant="body" color="secondary" align="center" style={{ marginTop: theme.spacing.sm }}>
              Are you sure you want to select this theme?
            </Typography>
            
            <View style={modalButtonsStyle}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setShowModal(false)}
                style={{ flex: 1 }}
              />
              <Button
                title="Confirm"
                variant="primary"
                onPress={confirmSelection}
                loading={loading}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default ThemeSelector;