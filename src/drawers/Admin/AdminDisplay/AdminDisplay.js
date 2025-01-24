import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../context/AuthProvider";
import AdminFooter from "../../../screens/Footer/AdminFooter";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
const AdminDisplay = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const route = useRoute();
  const empId = route.params.empId;
  //console.log("empIdDisplay", empId);
  const [seeUser, setSeeUser] = useState("");
  const { userId, handleClickVibration } = useAuth();
  const fetchData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/${empId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSeeUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 3000);
    // return () => clearInterval(intervalId);
  }, [fetchData]);

  const [logo, setLogo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  //console.log("logo", logo);
  const handleAttachLogo = async (option) => {
    handleClickVibration();
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
        const selectedAsset = result.assets[0]; // Assuming only one asset is selected
        const resizedImage = await resizeImage(selectedAsset.uri);
        setLogo(resizedImage);
      }
    } catch (error) {
      console.error('Error picking an image', error);
    }
  };

  const resizeImage = async (uri) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800, height: 600 } }],
      { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
    );

    return resizedImage.uri;
  };

  const [showUserImageModal, setShowUserImageModal] = useState(false);
  const [userImage, setUserImage] = useState(null);
  //console.log("userImage", userImage);
  const handleAttachUserImage = async (option) => {
    handleClickVibration();
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
        const selectedAsset = result.assets[0]; // Assuming only one asset is selected
        const resizedImage = await resizeImage(selectedAsset.uri);
        setUserImage(resizedImage);
      }
    } catch (error) {
      console.error('Error picking an image', error);
    }
  };
  const [loading, setLoading] = useState(false);

  const updateFunction = async () => {
    handleClickVibration();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("logo", {
        uri: logo,
        name: "logo.jpg",
        type: "image/jpeg",
      });
      formData.append("userImage", {
        uri: userImage,
        name: "userImage.jpg",
        type: "image/jpeg",
      });
      const response = await fetch(
        `https://bc.exploreanddo.com/api/edit-user-image/${empId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      const data = await response.json();
      //console.log("API Response:", data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigation.navigate("Admin Edit Info", {
        empId: empId
      })
      Toast.show({
        type: "success",
        text1: `Logo & Images updated successfully`,
        position: "top",
        visibilityTime: 4000,
      });
    } catch (error) {
      console.error("Error updating:", error);
      Toast.show({
        type: "error",
        text1: `Error updating : Something went wrong try again!`,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Admin Display", {
                empId: empId
              });
            }}
          >
            <LinearGradient
              colors={["white", "#8339FF"]}
              start={[1, 0]}
              end={[0, 1]}
              style={styles.button}
            >
              <Text style={styles.title}>Display</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBorder}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Admin Edit Info", {
                empId: empId
              });
            }}
          >
            <Text style={styles.label}>Edit Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBorder}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Admin Add Fields", {
                empId: empId
              });
            }}
          >
            <Text style={styles.label}>Add Fields</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.row,
            {
              elevation: 1,
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
              paddingHorizontal: Dimensions.get("window").width * 0.05,
              paddingVertical: Dimensions.get("window").height * 0.03,
              marginVertical: Dimensions.get("window").height * 0.05,
            },
          ]}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#ECEDF2",
              width: "100%",
              height: 130,
              borderRadius: 10,
              padding: 16,
              borderWidth: 1,
              borderColor: "#ECEDF2",
              justifyContent: "center",
              alignItems: "center",
              elevation: 1,
              position: "relative",
            }}
            onPress={() => setShowModal(true)}
          >
            {logo ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: logo }}
                  style={{ width: 200, height: 100 }}
                />
                <TouchableOpacity
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onPress={() => {
                    setLogo(null);
                  }}
                >
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name="image" size={40} color="gray" />
                <Text style={{ textAlign: "center", color: "gray" }}>
                  Change Logo
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {userImage ? (
            <>
              <Image
                source={{ uri: userImage }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  position: "absolute",
                  top: 10,
                  left: 10,
                  borderColor: "#8339FF",
                  borderWidth: 2,
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", top: 5, left: 80 }}
                onPress={() => setShowUserImageModal(true)}
              >
                <MaterialCommunityIcons
                  name="account-edit"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* <Image
                source={require("../../../../assets/user.jpg")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  position: "absolute",
                  top: 10,
                  left: 10,
                  borderColor: "#8339FF",
                  borderWidth: 2,
                }}
                resizeMode="contain"
              /> */}
              <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                position: "absolute",
                top: 10,
                left: 10,
                borderColor: "#8339FF",
                borderWidth: 2,
              }}
              onPress={() => setShowUserImageModal(true)}
            >
              <MaterialCommunityIcons name="account-edit" size={40} color="#8339FF" style={{ textAlign: "center" }}/>
              <Text style={{ textAlign: "center", color: "#8339FF" }}>
                Choose
              </Text>
              <Text style={{ textAlign: "center", color: "#8339FF" }}>
                Image
              </Text>
            </TouchableOpacity>
              
              <TouchableOpacity
                style={{ position: "absolute", top: 5, left: 80 }}
                onPress={() => setShowUserImageModal(true)}
              >
                <MaterialCommunityIcons
                  name="account-edit"
                  size={20}
                  color="#8339FF"
                />
              </TouchableOpacity>
            </>
          )}
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
        <Modal
          visible={showUserImageModal}
          animationType="slide"
          transparent={true}
        >
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
                  handleAttachUserImage("camera");
                  setShowUserImageModal(false);
                }}
              >
                <Text style={{ marginBottom: 20 }}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleAttachUserImage("gallery");
                  setShowUserImageModal(false);
                }}
              >
                <Text>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowUserImageModal(false)}>
                <Text style={{ marginTop: 20 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {Platform.OS === "android" && (
          <StatusBar backgroundColor="#702DFF" barStyle="light-content" />
        )}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "#8339FF",
                width: width * 0.9,
                marginBottom: 10,
              },
            ]}
            onPress={updateFunction}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Update Logo's</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#8339FF", width: width * 0.9 },
            ]}
            onPress={() => navigation.navigate("Admin Layout", {
              empId: empId
            })}
          >
            <Text style={styles.buttonText}>Change Layout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AdminFooter navigation={navigation} />
    </View>
  );
};

export default AdminDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    //marginTop: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#eee",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8339FF",
  },

  button: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonBorder: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#8339FF",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
});
