import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthProvider";

const Footer = ({ navigation }) => {
  const { themeIds, handleClickVibration } = useAuth();
  const handleThemeNavigation = (themeId) => {
    switch (themeId) {
      case 1:
        return "UserTheme1";
      case 2:
        return "UserTheme2";
      case 3:
        return "UserTheme3";
      case 4:
        return "UserTheme4";
      case 5:
        return "UserTheme5";
      case 6:
        return "UserTheme6";
      default:
        return "My Card";
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          handleClickVibration();
          navigation.navigate("Contacts");
        }}
      >
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={() => {
            handleClickVibration();
            navigation.navigate("Contacts");
          }}
        >
          <MaterialIcons
            name="people-outline"
            size={30}
            color="black"
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Contacts");
            }}
          />
          <Text style={[styles.inputLabel, { fontWeight: "bold" }]}>
            Leads
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => {
          //const themeId = loggedInUser.theme_id;
          handleClickVibration();
          const themeId = Number(themeIds);
          const themeScreen = handleThemeNavigation(themeId);
          navigation.navigate(themeScreen);
        }}
      >
        <MaterialIcons name="credit-card" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          handleClickVibration();
          navigation.navigate("Settings");
        }}
      >
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={() => {
            handleClickVibration();
            navigation.navigate("Settings");
          }}
        >
          <MaterialIcons
            name="settings"
            size={30}
            color="black"
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Settings");
            }}
          />
          <Text style={[styles.inputLabel, { fontWeight: "bold" }]}>
            Settings
          </Text>
        </TouchableOpacity>
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
  buttonText: {
    marginTop: 5,
  },
});
