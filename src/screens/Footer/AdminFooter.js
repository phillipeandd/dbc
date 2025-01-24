import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const AdminFooter = ({ navigation }) => {
  const isFocused = useIsFocused();

  const handleBackButton = () => {
    if (isFocused) {
      if (
        navigation.isFocused() &&
        navigation.dangerouslyGetState().routes.length === 1
      ) {
        BackHandler.exitApp();
        return true;
      } else {
        navigation.goBack();
        return true;
      }
    }
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, [isFocused]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Admin Home")}
      >
        <TouchableOpacity style={styles.buttonContent}>
          <Ionicons
            name="home-outline"
            size={30}
            color="#8C79F0"
            onPress={() => navigation.navigate("Admin Home")}
          />
          {/* <Text style={[styles.inputLabel, {  fontWeight:"bold" }]}>Home</Text> */}
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Add User")}
      >
        <MaterialIcons name="group-add" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleBack}>
        <View style={styles.buttonContent}>
          <MaterialCommunityIcons
            name="arrow-u-right-top"
            size={30}
            color="#8C79F0"
          />
          {/* <Text style={[styles.inputLabel, { fontWeight:"bold"}]}>Settings</Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdminFooter;

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
    backgroundColor: "#8C79F0",
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
