import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ForgotPassword = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [isResetLoading, setisResetLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      setisResetLoading(true);
      const response = await fetch(
        "https://bc.exploreanddo.com/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      //console.log("forgot data",data);
      if (data.success) {
        Toast.show({
          type: "success",
          // text1: `Reset mail sent to ${email}`,
          text1: `${data.data} ${email}`,
          text2: `Check your email to reset your password`,
          position: "top",
          visibilityTime: 4000,
        });
      } else {
        Toast.show({
          type: "error",
          // text1: `Reset mail sent to ${email}`,
          text1: `${data.data} ${email}`,
          text2: `Entered Email not found`,
          position: "top",
          visibilityTime: 4000,
        });
      }

      //navigation.navigate("Login");
    } catch (error) {
      //console.error("Registration error:", error);
      Toast.show({
        type: "error",
        text1: `Something went wrong!`,
        text2: `Try again in some time`,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setisResetLoading(false);
      setEmail("");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.welcomeMessage, { color: "white" }]}></Text>
        <Text style={[styles.welcomeMessage, { color: "white" }]}>
          Reset Password
        </Text>
        <Text style={[{ color: "white", fontSize: 14 }]}>
          Enter your registered email
        </Text>
        <Text style={[{ color: "white", fontSize: 14 }]}>
          to receive reset password link
        </Text>
      </View>

      <LinearGradient
        colors={["white", "white"]}
        style={[styles.gradientBackground, { width, height }]}
        start={[0, 0]}
        end={[0, 1]}
      >
        <Text style={[{ color: "gray", fontSize: 14 }]}>
          Enter your registered email to reset password
        </Text>
        <TextInput
          style={[styles.input, { width: width * 0.8 }]}
          placeholder="Registered Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "#702DFF", width: width * 0.8 },
          ]}
          onPress={handleResetPassword}
        >
          {isResetLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={[styles.buttonText, { color: "white" }]}>
              Reset Password
            </Text>
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
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#702DFF",
  },
  content: {
    //flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    marginVertical: Dimensions.get("window").height * 0.15,
  },
  welcomeMessage: {
    fontSize: Dimensions.get("window").width * 0.08,
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
    //shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginVertical: 10,
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
  },
});

export default ForgotPassword;
