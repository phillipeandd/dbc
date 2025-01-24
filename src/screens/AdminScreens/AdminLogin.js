import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthProvider";

const AdminLogin = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const {
    adminloginData,
    isadminInvalidCredentials,
    handleadminEmailChange,
    handleadminPasswordChange,
    handleAdminLogin,
    isLoginLoading,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.welcomeMessage, { color: "white" }]}>
            Welcome to
          </Text>
          <Text style={[styles.welcomeMessage, { color: "white" }]}>
            Digital Business Card
          </Text>
          <Text style={[{ color: "white", fontSize: 14 }]}>
            Enter your details to start with Admin Portal
          </Text>
        </View>

        <LinearGradient
          colors={["white", "white"]}
          style={[styles.gradientBackground, { width, height }]}
          start={[0, 0]}
          end={[0, 1]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <TextInput
                style={[styles.input, { width: width * 0.8 }]}
                placeholder="Email Address"
                keyboardType="email-address"
                value={adminloginData.email}
                onChangeText={handleadminEmailChange}
                returnKeyType="next"
              />

              <View style={[styles.control]}>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={[styles.input, { width: width * 0.8 }]}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={adminloginData.password}
                    onChangeText={handleadminPasswordChange}
                    returnKeyType="done"
                  />

                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={25}
                    color="black"
                    style={{ position: "absolute", right: 10, top: 20 }}
                    onPress={togglePasswordVisibility}
                  />
                </View>
              </View>
              <TouchableOpacity style={{ marginBottom: 8 }}
                onPress={() => navigation.navigate("Reset Password")}>
                <Text style={[{ color: "#702DFF" }]}>Forgot Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#702DFF", width: width * 0.8 },
                ]}
                onPress={handleAdminLogin}
              >
                {isLoginLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={[styles.buttonText, { color: "white" }]}>LogIn</Text>
                )}
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <TouchableOpacity
                  style={[styles.circularButton]}
                  onPress={() => navigation.navigate("Landing Screen")}
                >
                  <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6E2CFB",
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    marginVertical: Dimensions.get("window").height * 0.12,
  },
  welcomeMessage: {
    fontSize: Dimensions.get("window").width * 0.08,
    fontWeight: "900",
  },
  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical:40
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: Dimensions.get("window").height * 0.06,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F1ECF8",
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginVertical: 8,
  },
  button: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Dimensions.get("window").height * 0.03,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  circularButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 250,
  },
});

export default AdminLogin;
