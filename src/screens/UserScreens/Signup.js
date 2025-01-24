import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

const Signup = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: `Password and Confirm Password Did Not match`,
          position: "top",
          visibilityTime: 4000,
        });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Toast.show({
          type: "error",
          text1: `Please enter a valid email address`,
          position: "top",
          visibilityTime: 4000,
        });
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("phone", phone);
      formData.append("address", address);
      const response = await fetch("https://bc.exploreanddo.com/api/register", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        //console.log("Registration successful", data);
        Toast.show({
          type: "success",
          text1: `Registration successfully done`,
          position: "top",
          visibilityTime: 4000,
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
        setAddress("");
        navigation.navigate("Login");
      } else {
        console.error("Registration failed Status:", response.status);
        Toast.show({
          type: "error",
          text1: `Registration failed`,
          position: "top",
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      console.error("Registration failed", error);
      Toast.show({
        type: "error",
        text1: `Registration failed`,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.content}>
        <Text
          style={[
            styles.welcomeMessage,
            { fontSize: Dimensions.get("window").width * 0.05 },
          ]}
        >
          Sign Up to
        </Text>
        <Text
          style={[
            styles.welcomeMessage,
            { fontSize: Dimensions.get("window").width * 0.08 },
          ]}
        >
          Digital
        </Text>
        <Text
          style={[
            styles.welcomeMessage,
            {
              fontSize: Dimensions.get("window").width * 0.08,
              color: "#702DFF",
            },
          ]}
        >
          Business Card
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputLabel}>First name</Text>
              <TextInput
                style={[styles.input, { width: width * 0.45 }]}
                placeholder="First Name"
                type="text"
                name="firstname"
                value={firstname}
                onChangeText={(text) => setFirstName(text)}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Last name</Text>
              <TextInput
                style={[styles.input, { width: width * 0.45 }]}
                placeholder="Last name"
                type="text"
                name="lastname"
                value={lastname}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
          </View>

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, { width: width * 0.9 }]}
            placeholder="Email"
            type="email-address"
            name="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />

          <Text style={styles.inputLabel}>Mobile no</Text>
          <TextInput
            style={[styles.input, { width: width * 0.9 }]}
            placeholder="Mobile"
            type="text"
            keyboardType="phone-pad"
            name="phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            maxLength={10}
          />

          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[styles.input, { width: width * 0.45 }]}
                placeholder="Password"
                type="text"
                name="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={togglePasswordVisibility}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={[styles.input, { width: width * 0.45 }]}
                placeholder="Confirm Password"
                type="text"
                name="confirmPassword"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={!isConfirmPasswordVisible}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Ionicons
                  name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={[styles.input, { width: width * 0.9 }]}
            placeholder="Address"
            type="text"
            name="address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#161616", width: width * 0.9 },
            ]}
            //onPress={() => navigation.navigate("Login")}
            onPress={handleRegister}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.loginText, { textAlign: "center" }]}>
              Already have an account?{" "}
              <Text style={styles.loginLink}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        style={[styles.circularButton]}
        onPress={() => navigation.navigate("Landing Screen")}
      >
          <MaterialIcons name="arrow-back" size={24} color="white" /> 
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    marginTop: Dimensions.get("window").height * 0.15,
  },
  welcomeMessage: {
    // fontSize: Dimensions.get("window").width * 0.05,
    fontWeight: "bold",
  },
  signUpText: {
    fontSize: Dimensions.get("window").height * 0.03,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    width: Dimensions.get("window").width * 0.9,
  },
  inputLabel: {
    fontSize: Dimensions.get("window").height * 0.015,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 5,
    color: "#702DFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  icon:{
    position:"absolute",
    right:10,
    top:45
  },

  input: {
    height: Dimensions.get("window").height * 0.06,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#EDCDFF",
    //elevation: 1,
    //shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
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
  loginText: {
    fontSize: Dimensions.get("window").height * 0.02,
    color: "gray",
    marginVertical: 5,
  },
  loginLink: {
    color: "#702DFF",
    fontWeight: "bold",
  },
  circularButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:300
  },
});

export default Signup;
