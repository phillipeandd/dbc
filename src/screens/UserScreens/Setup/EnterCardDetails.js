import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { useAuth } from "../../../context/AuthProvider";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get("window");
const Step1Screen = ({ navigation }) => {
  const { business_name, handleBuisnessChange, website, handleWebsiteChange } =
    useAuth();

  const handleContinue = () => {
    navigation.navigate("Step2", { business_name, website });
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this offset if necessary
  >
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <Image source={require("../../../../assets/social/speclogo.png")} />
        </TouchableOpacity>

        <Text style={styles.text}>Enter your</Text>
        <Text style={[styles.text, { color: "#F45A57", marginBottom: 15 }]}>
          details to get started
        </Text>

        <Text style={styles.inputLabel}>Enter your Full Name* </Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={business_name}
          onChangeText={handleBuisnessChange}
        />
        <Text style={styles.inputLabel}>Enter your website* </Text>
        <TextInput
          style={styles.input}
          placeholder="Website URL"
          value={website}
          onChangeText={handleWebsiteChange}
          keyboardType="email-address"
        />

        <TouchableOpacity style={[styles.button,{}]} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Step2Screen = ({ navigation, route }) => {
  const { email, phone, handleBuisnessEmailChange, handleBuisnessPhoneChange } =
    useAuth();

  const handleContinue = () => {
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
    navigation.navigate("Step3", {
      ...route.params,
      email,
      phone,
    });
  };
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this offset if necessary
  >
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <Image source={require("../../../../assets/social/speclogo.png")} />
        </TouchableOpacity>

        <Text style={styles.text}>Help people</Text>
        <Text style={[styles.text, { marginBottom: 15 }]}>
          reach you at <Text style={{ color: "#F45A57" }}>work</Text>
        </Text>

        <Text style={styles.inputLabel}>Work Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Work Email"
          value={email}
          onChangeText={handleBuisnessEmailChange}
          keyboardType="email-address"
        />
        <Text style={styles.inputLabel}>Work Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Work Phone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={handleBuisnessPhoneChange}
          maxLength={10}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Step3Screen = ({ navigation, route }) => {
  const { company_name, title, handleCompanyChange, handleTitleChange } =
    useAuth();

  const handleContinue = () => {
    navigation.navigate("Step4", {
      ...route.params,
      company_name,
      title,
    });
  };
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this offset if necessary
  >
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <Image source={require("../../../../assets/social/speclogo.png")} />
        </TouchableOpacity>

        <Text style={styles.text}>
          Enter <Text style={{ color: "#F45A57" }}>professional details</Text>
        </Text>
        <Text style={[styles.text, { marginBottom: 15 }]}>
          your card should <Text style={{ color: "#F45A57" }}>display</Text>
        </Text>

        <Text style={styles.inputLabel}>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Company Name"
          value={company_name}
          onChangeText={handleCompanyChange}
        />
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Job Title"
          value={title}
          onChangeText={handleTitleChange}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Step4Screen = ({ navigation, route }) => {
  const { logo, setLogo } = useAuth();

  const handleContinue = () => {
    navigation.navigate("Step5", {
      ...route.params,
      logo,
      
    });
  };

  const [showModal, setShowModal] = useState(false);

  const handleAttachLogo = async (option) => {
    try {
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
        const selectedAsset = result.assets[0]; // Assuming only one asset is selected
        const resizedImage = await resizeImage(selectedAsset.uri);
        setLogo(resizedImage);
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  const resizeImage = async (uri) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 600, height: 600 } }],
      { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
    );

    return resizedImage.uri;
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this offset if necessary
  >
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <Image source={require("../../../../assets/social/speclogo.png")} />
        </TouchableOpacity>

        <Text style={styles.text}>Let's add</Text>
        <Text style={[styles.text, { marginBottom: 15 }]}>
          your <Text style={{ color: "#F45A57" }}>company logo!</Text>
        </Text>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ECEDF2",
              width: "90%",
              height: 180,
              borderRadius: 10,
              padding: 16,
              borderWidth: 1,
              borderColor: "#ECEDF2",
              justifyContent: "center",
              alignItems: "center",
              elevation: 1,
            }}
            onPress={() => setShowModal(true)}
          >
            {logo ? (
              <Image
                source={{ uri: logo }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name="image" size={40} color="black" />
                <Text style={{ textAlign: "center" }}>
                  Upload your logo here
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} animationType="slide" transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleAttachLogo("camera");
                  setShowModal(false);
                }}
              >
                <Text style={{ marginBottom: 20 }}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleAttachLogo("gallery");
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
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Step5Screen = ({ navigation, route }) => {
  const {
    business_name,
    website,
    email,
    phone,
    company_name,
    title,
    logo,
    setLogo,
    userImage,
    setUserImage,
    userId,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleAttachImage = async (option) => {
    try {
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
        const selectedAsset = result.assets[0]; // Assuming only one asset is selected
        const resizedImage = await resizeImage(selectedAsset.uri);
        setUserImage(resizedImage);
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  const resizeImage = async (uri) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 600, height: 600 } }],
      { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
    );

    return resizedImage.uri;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("business_name", business_name);
      formData.append("website", website);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("company_name", company_name);
      formData.append("title", title);
      formData.append("user_id", userId);
      formData.append("logo", {
        uri: logo,
        name: "companylogo.jpg",
        type: "image/jpeg",
      });
      formData.append("userImage", {
        uri: userImage,
        name: "userimage.jpg",
        type: "image/jpeg",
      });
      const response = await fetch(
        "https://bc.exploreanddo.com/api/save-company-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        //console.log("API Response Company Card", data);
        Toast.show({
          type: "success",
          text1: `Card Details Added Successfully`,
          position: "top",
          visibilityTime: 4000,
        });
        // navigation.navigate("My Card");
        navigation.navigate("Layout");
      } else {
        Toast.show({
          type: "error",
          text1: `Adding Details Failed`,
          text2: `Network Error - Please try again`,
          position: "top",
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      Toast.show({
        type: "error",
        text1: `Adding Details Failed`,
        text2: error,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this offset if necessary
  >
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <Image source={require("../../../../assets/social/speclogo.png")} />
        </TouchableOpacity>

        <Text style={styles.text}>Let's add</Text>
        <Text style={[styles.text, { marginBottom: 15 }]}>
          your <Text style={{ color: "#F45A57" }}>user profile!</Text>
        </Text>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ECEDF2",
              width: "90%",
              height: 180,
              borderRadius: 10,
              padding: 16,
              borderWidth: 1,
              borderColor: "#ECEDF2",
              justifyContent: "center",
              alignItems: "center",
              elevation: 1,
            }}
            onPress={() => setShowModal(true)}
          >
            {userImage ? (
              <Image
                source={{ uri: userImage }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name="image" size={40} color="black" />
                <Text style={{ textAlign: "center" }}>
                  Upload your profile here
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} animationType="slide" transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleAttachImage("camera");
                  setShowModal(false);
                }}
              >
                <Text style={{ marginBottom: 20 }}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleAttachImage("gallery");
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
        <TouchableOpacity
          style={styles.button}
          //onPress={() => navigation.navigate("Layout")}
          onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const EnterCardDetails = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Step1"
        component={Step1Screen}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="Step2"
        component={Step2Screen}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="Step3"
        component={Step3Screen}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="Step4"
        component={Step4Screen}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="Step5"
        component={Step5Screen}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export default EnterCardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Assuming a white background color
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  button: {
    backgroundColor: "#161616",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
    
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    height: Dimensions.get("window").height * 0.06,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F5EDED",
    elevation: 1,
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  inputLabel: {
    fontSize: Dimensions.get("window").height * 0.015,
    fontWeight: "400",
    marginVertical: 5,
    color: "#F45A57",
  },
});
