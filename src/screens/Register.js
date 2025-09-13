import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";

/**
 * Registration screen component for new user signup
 * @param {Object} navigation - Navigation object for screen transitions
 */
const Register = ({ navigation }) => {
  const [registrationData, setRegistrationData] = useState({
    firstname: "",
    lastname: "",
    store_name: "",
    password: "",
    mobile: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * Handle user registration with validation and API call
   */
  const handleRegistration = async () => {
    if (registrationData.password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: `Password & Confirm Password Did Not Match`,
        position: "top",
        visibilityTime: 4000,
      });
      return;
    }

    try {
      const response = await fetch(
        "https://bc.exploreanddo.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const data = await response.json();
      Toast.show({
        type: "success",
        text1: `Welcome ${registrationData.firstname}`,
        text2: `Registered Successfully with Store Id ${data.data.store_id}`,
        position: "top",
        visibilityTime: 4000,
      });
      navigation.navigate("Login");
      
      // Reset form data
      setRegistrationData({
        firstname: "",
        lastname: "",
        store_name: "",
        password: "",
        mobile: "",
      });
      setConfirmPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: "Please try again later",
        position: "top",
        visibilityTime: 4000,
      });
    }
  };

  /**
   * Update registration data field
   * @param {string} field - Field name to update
   * @param {string} value - New value for the field
   */
  const updateRegistrationField = (field, value) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.box}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={require("../../assets/loginlogo.png")} />
        </View>
        
        <View style={styles.control}>
          <TextInput
            placeholder="First Name"
            style={[styles.input]}
            value={registrationData.firstname}
            onChangeText={(text) => updateRegistrationField("firstname", text)}
            backgroundColor="white"
          />
        </View>

        <View style={styles.control}>
          <TextInput
            placeholder="Last Name"
            style={[styles.input]}
            value={registrationData.lastname}
            onChangeText={(text) => updateRegistrationField("lastname", text)}
            backgroundColor="white"
          />
        </View>
        
        <View style={styles.control}>
          <TextInput
            placeholder="Store Name"
            style={[styles.input]}
            value={registrationData.store_name}
            onChangeText={(text) => updateRegistrationField("store_name", text)}
            backgroundColor="white"
          />
        </View>

        <View style={styles.control}>
          <TextInput
            placeholder="Mobile"
            style={[styles.input]}
            value={registrationData.mobile}
            onChangeText={(text) => updateRegistrationField("mobile", text)}
            backgroundColor="white"
            maxLength={10}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.control}>
          <TextInput
            secureTextEntry
            placeholder="Password"
            style={[styles.input]}
            value={registrationData.password}
            onChangeText={(text) => updateRegistrationField("password", text)}
            backgroundColor="white"
          />
        </View>
        
        <View style={styles.control}>
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            style={[styles.input]}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            backgroundColor="white"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text>
            Already have an account,{" "}
            <Text
              style={{ color: "#702DFF" }}
              onPress={() => navigation.navigate("Login")}
            >
              Sign In{" "}
            </Text>{" "}
            here
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    borderRadius: 10,
    marginVertical: 80,
  },
  control: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  button: {
    backgroundColor: "#702DFF",
    paddingHorizontal: 25,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: 300,
  },