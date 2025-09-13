import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Modal,
  Image,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AdminFooter from "../../screens/Footer/AdminFooter";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";

/**
 * Add User screen for admin to create new employee profiles
 * @param {Object} navigation - Navigation object for screen transitions
 */
const AddUser = ({ navigation }) => {
  const { userId } = useAuth();
  const { width, height } = Dimensions.get("window");
  
  // Form state
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [branch_name, setBranchName] = useState("");
  const [title, setTitle] = useState("");
  const [serial_no, setSerialNo] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Password visibility state
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  // Branches data
  const [branches, setBranches] = useState([]);

  /**
   * Handle image attachment with platform check and permissions
   * @param {string} option - 'camera' or 'gallery'
   */
  const handleAttachBill = async (option) => {
    try {
      if (Platform.OS !== 'ios') {
        Alert.alert(
          'Unsupported Platform',
          'This feature is only available on iOS devices.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Please allow access to the camera to attach a bill.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      let result;
      if (option === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.1,
        });
      } else if (option === "gallery") {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.1,
        });
      }

      if (!result.canceled) {
        if (!result.assets || result.assets.length === 0) {
          console.error('No assets selected');
          return;
        }
        const selectedAsset = result.assets[0];
        const resizedImage = await resizeImage(result.uri);
        setUserImage(resizedImage);
      }
    } catch (error) {
      console.error('Error picking an image', error);
    }
  };

  /**
   * Resize image to optimize file size
   * @param {string} uri - Image URI to resize
   * @returns {string} Resized image URI
   */
  const resizeImage = async (uri) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800, height: 600 } }],
      { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
    );
    return resizedImage.uri;
  };

  /**
   * Fetch available branches for the company
   */
  const fetchBranches = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/company-branches/${userId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setBranches(response.data.data.branches);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  /**
   * Handle user registration with validation
   */
  const handleRegisterUser = async () => {
    try {
      if (password !== confirm_password) {
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
      formData.append("user_id", userId);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirm_password", confirm_password);
      formData.append("phone", phone);
      formData.append("branch_name", branch_name);
      formData.append("title", title);
      formData.append("serial_no", serial_no);
      formData.append("userImage", {
        uri: userImage,
        name: "userimage.jpg",
        type: "image/jpeg",
      });
      
      const response = await fetch(
        `https://bc.exploreanddo.com/api/add-nfc-user`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: `Company Employee Added Successfully`,
          position: "top",
          visibilityTime: 4000,
        });
        
        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
        setBranchName("");
        setSerialNo("");
        setTitle("");
        setUserImage("");
        navigation.navigate("Admin Home");
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

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  /**
   * Toggle confirm password visibility
   */
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <View style={[styles.container, { backgroundColor: "#6E2CFB" }]}>
      <View style={styles.content}>
        <Text style={[{ color: "white", fontSize: 14 }]}>
          Create Your Digital Card
        </Text>
        <Text style={[styles.welcomeMessage, { color: "white" }]}>
          Add Profile
        </Text>
      </View>

      <LinearGradient
        colors={["#F6F6F6", "#F6F6F6"]}
        style={[styles.gradientBackground, { width, height }]}
        start={[0, 0]}
        end={[0, 1]}
      >
        <ScrollView style={[styles.container, { marginBottom: "20%" }]}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={() => setShowModal(true)}
            >
              {userImage ? (
                <Image
                  source={{ uri: userImage }}
                  style={{ width: 110, height: 110, borderRadius: 55 }}
                />
              ) : (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <MaterialCommunityIcons name="camera" size={40} color="black" />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <Modal visible={showModal} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => {
                    handleAttachBill("camera");
                    setShowModal(false);
                  }}
                >
                  <Text style={{ marginBottom: 20 }}>Take a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleAttachBill("gallery");
                    setShowModal(false);
                  }}
                >
                  <Text>Choose from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={{ marginTop: 20 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
          {Platform.OS === "android" && (
            <StatusBar backgroundColor="#702DFF" barStyle="light-content" />
          )}
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>First name</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.45 }]}
                  placeholder="First Name"
                  value={firstname}
                  onChangeText={setFirstName}
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>Last name</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.45 }]}
                  placeholder="Last name"
                  value={lastname}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, { width: width * 0.9 }]}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.inputLabel}>Mobile no</Text>
            <TextInput
              style={[styles.input, { width: width * 0.9 }]}
              placeholder="Mobile"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />
            
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>Position</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.45 }]}
                  placeholder="Position"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>NFC Serial No</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.45 }]}
                  placeholder="NFC Serial No"
                  value={serial_no}
                  onChangeText={setSerialNo}
                />
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.45 }]}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
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
                  value={confirm_password}
                  onChangeText={setConfirmPassword}
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
            
            <Text style={styles.inputLabel}>Branch Name</Text>
            <Picker
              selectedValue={branch_name}
              onValueChange={(itemValue) => setBranchName(itemValue)}
            >
              <Picker.Item
                label="Select a branch"
                value=""
                style={styles.pickerItem}
              />
              {branches.map((branch) => (
                <Picker.Item
                  key={branch.id}
                  label={branch.branch_name}
                  value={branch.id}
                />
              ))}
            </Picker>
            
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "#702DFF", width: width * 0.6, marginBottom: 180 },
                ]}
                onPress={handleRegisterUser}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <AdminFooter navigation={navigation} />
      </LinearGradient>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    marginTop: Dimensions.get("window").height * 0.1,
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
    marginTop: Dimensions.get("window").height * 0.03,
  },
  imagePickerButton: {
    backgroundColor: "#ECEDF2",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#702DFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    marginTop: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  formContainer: {
    width: Dimensions.get("window").width * 0.9,
    paddingVertical: Dimensions.get("window").width * 0.05,
  },
  inputLabel: {
    fontSize: Dimensions.get("window").height * 0.015,
    fontWeight: "400",
    marginTop: 2,
    color: "#7878AB",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 35,
  },
  input: {
    height: Dimensions.get("window").height * 0.05,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F1ECF8",
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginVertical: 6,
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
