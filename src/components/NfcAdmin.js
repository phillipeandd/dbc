import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { useAuth } from "../context/AuthProvider";

// Initialize NFC Manager
NfcManager.start();

const NfcAdmin = ({ navigation,empId }) => {
  const { userId,handleClickVibration } = useAuth();
  const { width, height } = Dimensions.get("window");
  const [userData, setUserData] = useState(
    `https://bc.exploreanddo.com/get-web-nfc-user/${empId}`
  );

  // console.log("ee",empId);
  // console.log("eeuid",userId);
  const handleShare = () => {
    // Generate QR code data based on user data
   
    handleClickVibration();
    // const qrData = JSON.stringify(userData);
    // Navigate to Share Profile screen
    const updatedUserData = `https://bc.exploreanddo.com/get-web-nfc-user/${empId}`;
    const qrData = JSON.stringify(updatedUserData);
    navigation.navigate("Share Profile", { qrData });
  };

  

  // Function to initialize NFC Manager
  const initializeNFC = async () => {
    try {
      await NfcManager.start();
      console.log("NFC Manager initialized");
    } catch (error) {
      console.error("Error initializing NFC:", error);
    }
  };

  // Clean up NFC session
  const cancelNfcSession = async () => {
    try {
      await NfcManager.cancelTechnologyRequest(); // Cancel any active NFC session
      console.log("NFC session successfully canceled.");
    } catch (error) {
      console.warn("Error while canceling NFC session:", error);
    }
  };


  // Check if NFC is supported and enabled
  const checkNfcState = async () => {
    try {
      const isSupported = await NfcManager.isSupported();
      console.log("NFC Supported:", isSupported);
      if (!isSupported) {
        Alert.alert("Error", "NFC is not supported on this device.");
        return false;
      }

      const isEnabled = await NfcManager.isEnabled();
      console.log("NFC Enabled:", isEnabled);
      if (!isEnabled) {
        Alert.alert("Error", "NFC is not enabled. Please enable it in settings.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking NFC state:", error);
      Alert.alert("Error", "Failed to check NFC state.");
      return false;
    }
  };

  const writeNFCreconnect3 = async (link) => {
    try {
        console.log("Attempting to write NFC data...");
        await cancelNfcSession(); // Clean up any previous sessions
        await NfcManager.requestTechnology(NfcTech.Ndef); // Request NFC technology
        console.log("NFC Tag detected, ready for operations.");
  
        // Retrieve tag details
        const tag = await NfcManager.getTag();
        console.log("Tag object:", tag); // Log the tag object
  
        // Check if the tag supports NDEF
        if (!tag.techTypes.includes("android.nfc.tech.Ndef")) {
            throw new Error("The tag is not NDEF compatible.");
        }
  
        // Encode the link to NDEF format
        const bytes = Ndef.encodeMessage([Ndef.uriRecord(link)]);
        if (!bytes) throw new Error("Failed to encode NFC message.");
  
        console.log("Encoded NFC message:", bytes);
  
        // Write the encoded message to the NFC tag
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        Alert.alert("Success", "Link successfully written to the NFC tag!");
    } catch (error) {
        console.error("Error writing to NFC:", error);
        Alert.alert("Error", error.message || "Failed to write to NFC tag.");
    } finally {
        // Ensure the session is cleaned up in all cases
        await cancelNfcSession();
        console.log("NFC session cleaned up.");
    }
  };
  
  
  
  
    // Handle writing to the NFC tag
    const handleWrite = async () => {
      const link = `https://bc.exploreanddo.com/get-web-nfc-user/${empId}`;
      console.log("Preparing to write NFC tag with link:", link);
      if (await checkNfcState()) {
        await writeNFCreconnect3(link);
      }
    };
  
  
  
    // Initialize NFC on component mount
    useEffect(() => {
      initializeNFC();
      return () => {
        // Clean up on component unmount
        cancelNfcSession();
      };
    }, []);

  return (
    <View style={styles.rowReader}>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: "#8339FF", width: width * 0.35 },
        ]}
        onPress={handleWrite}
      >
        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
          <MaterialCommunityIcons
            name="cellphone-nfc"
            size={15}
            color={"white"}
          />
          Write to NFC
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: "#8339FF", width: width * 0.35 },
        ]}
        onPress={handleShare}
      >
        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
          <FontAwesome name="send-o" size={15} color={"white"} /> Share
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NfcAdmin;

const styles = StyleSheet.create({
  rowReader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
