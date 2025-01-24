import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LandingScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");

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
          onPress={() => navigation.navigate("Login")}
          //onPress={() => navigation.navigate("My Card")}
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
          onPress={() => navigation.navigate("Admin Login")}
          //onPress={()=>navigation.navigate("Theme6")}
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
          onPress={() => navigation.navigate("Signup")}
          //onPress={() => navigation.navigate("Admin Home")}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Create an account
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

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
});

export default LandingScreen;
