import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Footer from "../../../screens/Footer/Footer";
import { ScrollView } from "react-native-gesture-handler";
import { Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../context/AuthProvider";
const Settings = ({ navigation }) => {
  const {
    vibrationEnabled,
    setVibrationEnabled,
    handleVibrationToggle,
    handleClickVibration,
  } = useAuth();

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const toggleNotificationSwitch = () =>
    setIsNotificationEnabled((previousState) => !previousState);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const toggleSoundSwitch = () =>
    setIsSoundEnabled((previousState) => !previousState);

  const [isVibrateEnabled, setIsVibrateEnabled] = useState(false);
  const toggleVibrateSwitch = () =>
    setIsVibrateEnabled((previousState) => !previousState);

  const [isSyncEnabled, setIsSyncEnabled] = useState(false);

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      getContacts();
    } else {
      console.log("Contacts permission denied");
      Toast.show({
        type: "error",
        text1: `Contacts permission denied`,
        position: "top",
        visibilityTime: 4000,
      });
    }
  };
  const getContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });
    if (data.length > 0) {
      console.log("Contacts:", data);
      Toast.show({
        type: "error",
        text1: `${data.length} contacts found`,
        position: "top",
        visibilityTime: 4000,
      });
    } else {
      console.log("No contacts found");
      Toast.show({
        type: "error",
        text1: `No contacts found`,
        position: "top",
        visibilityTime: 4000,
      });
    }
  };

  const [isEmojiEnabled, setIsEmojiEnabled] = useState(false);
  const toggleEmojiSwitch = () =>
    setIsEmojiEnabled((previousState) => !previousState);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ margin: 10 }}>
        <View
          style={{
            marginTop: 15,
          }}
        >
          <Text style={styles.text}>Notification</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ margin: 10 }}>General Notification</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F45A57" }}
              thumbColor={isNotificationEnabled ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotificationSwitch}
              value={isNotificationEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ margin: 10 }}>Sound</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F45A57" }}
              thumbColor={isSoundEnabled ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSoundSwitch}
              value={isSoundEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ margin: 10 }}>Vibrate</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F45A57" }}
              thumbColor={vibrationEnabled ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              // onValueChange={toggleVibrateSwitch}
              // value={isVibrateEnabled}
              value={vibrationEnabled}
              onValueChange={handleVibrationToggle}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.2,
            borderBottomColor: "gray",
            margin: 15,
          }}
        />
        <View>
        
          <Text style={styles.text}>Contact</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ margin: 10 }}>Sync Contacts</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F45A57" }}
              thumbColor={isSyncEnabled ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => {
                setIsSyncEnabled(value);
                if (value) {
                  requestContactsPermission();
                }
              }}
              value={isSyncEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ margin: 10 }}>Show emoji when connect</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F45A57" }}
              thumbColor={isEmojiEnabled ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleEmojiSwitch}
              value={isEmojiEnabled}
            />
          </View>
         
        </View>
        <View
          style={{
            borderBottomWidth: 0.2,
            borderBottomColor: "gray",
            margin: 15,
          }}
        />
        <View>
        <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
        onPress={() => {
          handleClickVibration();
          //handleClickSound();
          navigation.navigate("Contact Support");
        }}
      >
        <Text style={{ marginRight: 10 }}>Contact Support</Text>
        <MaterialIcons
          name="chevron-right"
          size={40}
          color="#604A49"
          // style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
        onPress={() => {
          handleClickVibration();
          //handleClickSound();
          navigation.navigate("Help Center");
        }}
      >
        <Text style={{ marginRight: 10 }}>Help Center</Text>
        <MaterialIcons
          name="chevron-right"
          size={40}
          color="#604A49"
          // style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
        onPress={() => {
          handleClickVibration();
          //handleClickSound();
          navigation.navigate("Feedback");
        }}
      >
        <Text style={{ marginRight: 10 }}>Send Feedback</Text>
        <MaterialIcons
          name="chevron-right"
          size={40}
          color="#604A49"
          // style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
            onPress={() => {
              handleClickVibration();
              //handleClickSound();
              navigation.navigate("Privacy Policy");
            }}
          >
            <Text style={{ marginRight: 10 }}>Privacy Policy</Text>
            <MaterialIcons
              name="chevron-right"
              size={40}
              color="#604A49"
              // style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
            onPress={() => {
              handleClickVibration();
              //handleClickSound();
              navigation.navigate("Check Updates");
            }}
          >
            <Text style={{ marginRight: 10 }}>Check for updates</Text>
            <MaterialIcons
              name="chevron-right"
              size={40}
              color="#604A49"
              // style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});
