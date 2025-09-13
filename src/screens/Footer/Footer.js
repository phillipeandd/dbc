import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthProvider";

/**
 * Footer navigation component with tab-style navigation
 * @param {Object} navigation - Navigation object for screen transitions
 */
const Footer = ({ navigation }) => {
  const { themeIds, handleClickVibration } = useAuth();
  
  /**
   * Get the appropriate theme screen name based on theme ID
   * @param {number} themeId - The theme ID
   * @returns {string} Screen name for navigation
   */
  const handleThemeNavigation = (themeId) => {
    const themeScreens = {
      1: "UserTheme1",
      2: "UserTheme2",
      3: "UserTheme3",
      4: "UserTheme4",
      5: "UserTheme5",
      6: "UserTheme6",
    };
    return themeScreens[themeId] || "My Card";
  };

  /**
   * Navigate to contacts/leads screen
   */
  const navigateToContacts = () => {
    handleClickVibration();
    navigation.navigate("Contacts");
  };

  /**
   * Navigate to settings screen
   */
  const navigateToSettings = () => {
    handleClickVibration();
    navigation.navigate("Settings");
  };

  /**
   * Navigate to user's theme screen
   */
  const navigateToTheme = () => {
    handleClickVibration();
    const themeId = Number(themeIds);
    const themeScreen = handleThemeNavigation(themeId);
    navigation.navigate(themeScreen);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={navigateToContacts}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons
            name="people-outline"
            size={30}
            color="black"
          />
          <Text style={[styles.inputLabel, { fontWeight: "bold" }]}>
            Leads
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={navigateToTheme}
      >
        <MaterialIcons name="credit-card" size={30} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={navigateToSettings}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons
            name="settings"
            size={30}
            color="black"
          />
          <Text style={[styles.inputLabel, { fontWeight: "bold" }]}>
            Settings
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  footerButton: {
    position: "absolute",
    top: -15,
    left: "50%",
    transform: [{ translateX: -25 }],
    backgroundColor: "#702DFF",
    borderRadius: 100,
    padding: 15,
    zIndex: 2,
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  inputLabel: {
    fontSize: 12,
    marginTop: 4,
  },
}
)