import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Landing screen component - first screen users see
 * Provides options for different user types to login or register
 * @param {Object} navigation - Navigation object for screen transitions
 */
const LandingScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");

  /**
   * Navigation handlers for different user types
   */
  const navigateToSelfEmployedLogin = () => navigation.navigate("Login");
  const navigateToCompanyLogin = () => navigation.navigate("Admin Login");
  const navigateToSignup = () => navigation.navigate("Signup");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.welcomeMessage, {}]}>Digital</Text>
        <Text style={[styles.welcomeMessage, { color: "#702DFF" }]}>
          Business
        </Text>
        <Text style={[styles.welcomeMessage, { color: "#702DFF" }]}>Card</Text>
      </View>

      <LinearGradient
        colors={["#702DFF", "#EDCDFF"]}
        style={[styles.gradientBackground, { width, height }]}
        start={[0, 1]}
        end={[1, 0]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "white", width: width * 0.9 },
          ]}
          onPress={navigateToSelfEmployedLogin}
        >
          <Text style={[styles.buttonText, { color: "#161616" }]}>
            Login for Self Employed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "white", width: width * 0.9 },
          ]}
          onPress={navigateToCompanyLogin}
        >
          <Text style={[styles.buttonText, { color: "#702DFF" }]}>
            Login for Company
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "#161616", width: width * 0.9 },
          ]}
          onPress={navigateToSignup}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Create an account
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    marginTop: Dimensions.get("window").height * 0.15,
  },
  welcomeMessage: {
    fontSize: Dimensions.get("window").width * 0.15,
    fontWeight: "900",
  },
  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
