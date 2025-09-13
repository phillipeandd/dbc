import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/AuthProvider";
import Toast from "react-native-toast-message";

/**
 * Login screen component for user authentication
 * Supports both email and phone login (phone login coming soon)
 * @param {Object} navigation - Navigation object for screen transitions
 */
const Login = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [selectedTab, setSelectedTab] = useState("email");
  const {
    loginData,
    isInvalidCredentials,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    isLoginLoading,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  /**
   * Show coming soon message for features not yet implemented
   */
  const showComingSoonMessage = () => {
    Toast.show({
      type: "error",
      text1: `Coming Soon`,
      text2: `Currently This Feature is not available`,
      position: "top",
      visibilityTime: 3000,
    });
  };

  /**
   * Render phone number tab button
   */
  const renderPhoneNumberTab = () => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedTab === "phone" ? "#702DFF" : "white",
        borderRadius: 10,
        padding: 10,
        flex: 1,
        alignItems: "center",
      }}
      onPress={() => setSelectedTab("phone")}
    >
      <Text
        style={[
          styles.inputLabel,
          { color: selectedTab === "phone" ? "white" : "#702DFF" },
        ]}
      >
        Phone
      </Text>
    </TouchableOpacity>
  );

  /**
   * Render email tab button
   */
  const renderEmailTab = () => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedTab === "email" ? "#702DFF" : "white",
        borderRadius: 10,
        padding: 10,
        flex: 1,
        alignItems: "center",
      }}
      onPress={() => setSelectedTab("email")}
    >
      <Text
        style={[
          styles.inputLabel,
          { color: selectedTab === "email" ? "white" : "#702DFF" },
        ]}
      >
        Email
      </Text>
    </TouchableOpacity>
  );

  /**
   * Render appropriate input fields based on selected tab
   */
  const renderInputFields = () => {
    if (selectedTab === "phone") {
      return (
        <View style={{ marginVertical: 40 }}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="phone"
                size={25}
                color="#604A49"
                style={{ marginRight: 5 }}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#161616", width: width * 0.6 },
            ]}
            onPress={showComingSoonMessage}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              Request OTP
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ marginVertical: 15 }}>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="alternate-email"
                size={25}
                color="#604A49"
                style={{ marginRight: 5 }}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Id"
              keyboardType="email-address"
              value={loginData.email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="lock-outline"
                size={25}
                color="#604A49"
                style={{ marginRight: 5 }}
              />
            </View>
            <View style={styles.control}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={loginData.password}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.visibilityIcon}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#161616", width: width * 0.6 },
            ]}
            onPress={handleLogin}
          >
            {isLoginLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={[styles.buttonText, { color: "white" }]}>LogIn</Text>
            )}
          </TouchableOpacity>
        </View>
      );
    }
  };

  /**
   * Social login button component
   * @param {Object} icon - Icon source
   * @param {string} label - Button label
   */
  const IconButton = ({ icon, label }) => {
    return (
      <TouchableOpacity
        style={styles.buttonContainerSocial}
        onPress={showComingSoonMessage}
      >
        <View style={styles.buttonContentSocial}>
          <Image source={icon} style={styles.iconSocial} />
          <Text style={styles.buttonTextSocial}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  /**
   * Social login buttons grid
   * @param {Array} buttons - Array of button configurations
   */
  const Grid = ({ buttons }) => {
    return (
      <View>
        {buttons.map((item, index) => (
          <IconButton key={index} icon={item.icon} label={item.label} />
        ))}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <LinearGradient
          colors={["#702DFF", "#EDCDFF"]}
          style={[styles.gradientBackground, { width }]}
          start={[0, 0]}
          end={[0, 1]}
        >
          <View style={styles.content}>
            <Text
              style={[
                styles.welcomeMessage,
                { color: "white", fontWeight: 800 },
              ]}
            >
              Login Account
            </Text>
            <Text style={[styles.welcomeMessage, { fontSize: 16 }]}>
              Hi, Welcome back to{" "}
              <Text style={{ color: "white" }}>Digital Business Card</Text>
            </Text>

            <View style={styles.inputContainer}>
              {renderEmailTab()}
              {renderPhoneNumberTab()}
            </View>

            <View style={styles.inputContainer}>{renderInputFields()}</View>
            
            <TouchableOpacity 
              style={{ marginBottom: 8 }}
              onPress={() => navigation.navigate("Reset Password")}
            >
              <Text style={{ color: "#702DFF" }}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        <View style={styles.horizontalLineContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.horizontalLineText}>OR</Text>
          <View style={styles.horizontalLine} />
        </View>

        <Grid
          buttons={[
            {
              icon: require("../../../assets/social/icons8-google-48.png"),
              label: "Login with Google",
            },
            {
              icon: require("../../../assets/social/icons8-facebook-48.png"),
              label: "Login with Facebook",
            },
            {
              icon: require("../../../assets/social/icons8-apple-48.png"),
              label: "Login with Apple",
            },
          ]}
        />
        
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={[styles.loginText, { textAlign: "center" }]}>
              Not Registered Yet?{" "}
              <Text style={styles.loginLink}>Create an account</Text>
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.circularButton]}
            onPress={() => navigation.navigate("Landing Screen")}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.01,
    marginTop: Dimensions.get("window").height * 0.11,
  },
  welcomeMessage: {
    fontSize: Dimensions.get("window").width * 0.05,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: 300,
    marginVertical: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",
  },
  button: {
    backgroundColor: "#702DFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 10,
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
  },
  visibilityIcon: {
    padding: 5,
  },
  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: Dimensions.get("window").height * 0.02,
  },
  horizontalLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "black",
  },
  horizontalLineText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  buttonContainerSocial: {
    alignItems: "center",
    elevation: 0.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    paddingVertical: Dimensions.get("window").height * 0.01,
    marginVertical: Dimensions.get("window").height * 0.01,
    width: "70%",
    alignSelf: "center",
  },
  buttonContentSocial: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSocial: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  buttonTextSocial: {
    fontSize: 16,
    color: "#702DFF",
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
    marginBottom: 250,
  },
