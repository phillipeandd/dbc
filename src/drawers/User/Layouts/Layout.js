import React, { useState } from "react";
import { ActivityIndicator, Modal, Platform } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../../context/AuthProvider";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
const Layout = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const { width, height } = Dimensions.get("window");
  const { userId, handleClickVibration } = useAuth();
  const [selectedTheme, setSelectedTheme] = useState(null);
  //console.log("selectedTheme", selectedTheme);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectTheme = (theme) => {
    handleClickVibration();
    setSelectedTheme(theme);
    setShowModal(true);
  };

  const confirmThemeSelection = async () => {
    handleClickVibration();
    const themeId = selectedTheme.match(/\d+/)[0];
    const postData = {
      user_id: userId,
      theme_id: themeId,
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://bc.exploreanddo.com/api/update-theme",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      const data = await response.json();
      setLoading(false);
      navigation.navigate(selectedTheme);
      Toast.show({
        type: "success",
        text1: `Selected theme updated successfully`,
        text2: `Updated Theme Will Set On Home When You Login Again`,
        position: "top",
        visibilityTime: 4000,
      });
    } catch (error) {
      console.error("Error updating theme:", error);
      Toast.show({
        type: "error",
        text1: `Error updating : Something went wrong try again!`,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.inputLabelBold}>
          Select your page style you want to
        </Text>
        <Text style={styles.inputLabelBold}>
          share with your prospects and clients
        </Text>
      </View>

      <View style={styles.scrollViewContainer}>
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
          {/*<TouchableOpacity
            style={styles.imageContainer}
            //onPress={() => navigation.navigate("UserTheme1")}
            onPress={() => handleSelectTheme("UserTheme1")}
          >
            <Image source={require("../../../../assets/theme/1.jpg")} />
          </TouchableOpacity>
  <View style={styles.gap}></View> */}
          <TouchableOpacity
            style={styles.imageContainer}
            //onPress={() => navigation.navigate("UserTheme2")}
            onPress={() => handleSelectTheme("UserTheme2")}
          >
            <Image source={require("../../../../assets/theme/design3.jpg")} />
          </TouchableOpacity>
          <View style={styles.gap}></View>
          <TouchableOpacity
            style={styles.imageContainer}
            //onPress={() => navigation.navigate("UserTheme3")}
            onPress={() => handleSelectTheme("UserTheme3")}
          >
            <Image source={require("../../../../assets/theme/design4.jpg")} />
          </TouchableOpacity>
          <View style={styles.gap}></View>
          {/*<TouchableOpacity
            style={styles.imageContainer}
            //onPress={() => navigation.navigate("Theme4")}
            onPress={() => handleSelectTheme("UserTheme4")}
          >
            <Image source={require("../../../../assets/theme/4.jpg")} />
          </TouchableOpacity> */}
          <View style={styles.gap}></View>
          {/*<TouchableOpacity
            style={styles.imageContainer}
            //onPress={() => navigation.navigate("UserTheme5")}
            onPress={() => handleSelectTheme("UserTheme5")}
          >
            <Image source={require("../../../../assets/theme/5.jpg")} />
          </TouchableOpacity>
<View style={styles.gap}></View>*/}
          <TouchableOpacity
            style={styles.imageContainer}
            //onPress={() => navigation.navigate("UserTheme6")}
            onPress={() => handleSelectTheme("UserTheme6")}
          >
            <Image source={require("../../../../assets/theme/design2.jpg")} />
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/*
      <TouchableOpacity
        style={[styles.button, { width: width * 0.9 }]}
        //onPress={() => navigation.navigate("My Card")}
      >
        <Text style={styles.buttonText}>Select Style</Text>
      </TouchableOpacity>
  */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to select this theme?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  { width: width * 0.4, backgroundColor: "green" },
                ]}
                onPress={confirmThemeSelection}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Yes</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  { width: width * 0.4, backgroundColor: "red" },
                ]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {Platform.OS === "android" && (
        <StatusBar backgroundColor="#702DFF" barStyle="light-content" />
      )}
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabelBold: {
    fontSize: Dimensions.get("window").height * 0.025,
    fontWeight: "400",
  },
  scrollViewContainer: {
    //flex: 1,
    width: "100%",
  },
  scrollView: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  gap: {
    width: 20,
  },
  button: {
    backgroundColor: "#161616",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "column",
  },
  modalBtn: {
    backgroundColor: "#161616",
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
