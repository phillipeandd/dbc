import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useAuth } from "../context/AuthProvider";

// Conditionally import NFC Manager only on mobile platforms
let NfcManager, NfcTech, Ndef;
if (Platform.OS !== 'web') {
  const nfcModule = require("react-native-nfc-manager");
  NfcManager = nfcModule.default;
  NfcTech = nfcModule.NfcTech;
  Ndef = nfcModule.Ndef;
}

/**
 * NFC Component for handling NFC operations and profile sharing
 * @param {Object} navigation - Navigation object for screen transitions
 */
const NfcComponent = ({ navigation }) => {
  const { userId, handleClickVibration } = useAuth();
  const { width } = Dimensions.get("window");

  const [userData, setUserData] = useState(
    `https://bc.exploreanddo.com/get-web-nfc-user/${userId}`
  );

  /**
   * Initialize NFC Manager
   */
  const initializeNFC = async () => {
    if (Platform.OS === 'web') {
      return;
    }
    try {
      await NfcManager.start();
      console.log("NFC Manager initialized");
    } catch (error) {
      console.error("Error initializing NFC:", error);
    }
  };

  /**
   * Clean up active NFC session
   */
  const cancelNfcSession = async () => {
    if (Platform.OS === 'web') {
      return;
    }
    try {
      await NfcManager.cancelTechnologyRequest();
      console.log("NFC session successfully canceled.");
    } catch (error) {
      console.warn("Error while canceling NFC session:", error);
    }
  };

  /**
   * Check if NFC is supported and enabled on the device
   * @returns {boolean} True if NFC is available, false otherwise
   */
  const checkNfcState = async () => {
    if (Platform.OS === 'web') {
      Alert.alert("Error", "NFC is not supported on web browsers.");
      return false;
    }
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
        Alert.alert(
          "Error",
          "NFC is not enabled. Please enable it in settings."
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking NFC state:", error);
      Alert.alert("Error", "Failed to check NFC state.");
      return false;
    }
  };

  /**
   * Write a link to the NFC tag (legacy method)
   * @param {string} link - The URL to write to the NFC tag
   */
  const writeNFC = async (link) => {
    try {
      await cancelNfcSession();
      await NfcManager.requestTechnology(NfcTech.Ndef);
      console.log("NFC Tag detected, ready for operations.");

      const tag = await NfcManager.getTag();
      if (!tag.canMakeReadOnly()) {
        throw new Error("NFC tag is not writable.");
      }
      
      const bytes = Ndef.encodeMessage([
        Ndef.uriRecord(
          `https://bc.exploreanddo.com/get-web-nfc-user/${userId}`
        ),
      ]);
      if (!bytes) {
        Alert.alert("Error", "Failed to encode NFC message.");
        return;
      }

      await NfcManager.writeNdefMessage(bytes);
      Alert.alert("Success", "Link successfully written to the NFC tag!");
    } catch (error) {
      console.error("Error writing to NFC:", error);
      Alert.alert("Error", "Failed to write to NFC tag.");
    } finally {
      await cancelNfcSession();
    }
  };

  /**
   * Improved NFC write method with better error handling
   * @param {string} link - The URL to write to the NFC tag
   */
  const writeNFCreconnect = async (link) => {
    try {
      console.log("Attempting to write NFC data...");
      await cancelNfcSession(); // Clean up any previous sessions
      await NfcManager.requestTechnology(NfcTech.Ndef); // Request NFC technology
      console.log("NFC Tag detected, ready for operations.");

      // Check if the tag is compatible with NDEF format
      // const tag = await NfcManager.getTag();
      // if (!tag.canMakeReadOnly()) {
      //   throw new Error("NFC tag is not writable.");
      // }
      const tag = await NfcManager.getTag();
      console.log("Tag object:", tag); // Log the entire tag object

      // Check if the tag object has the expected properties
      if (!tag || !tag.tech) {
        throw new Error("Invalid tag object.");
      }

      // Check if the tag object has the canMakeReadOnly() method
      if (typeof tag.canMakeReadOnly !== "function") {
        throw new Error("tag.canMakeReadOnly is not a function.");
      }
      const bytes = Ndef.encodeMessage([
        Ndef.uriRecord(
          `https://bc.exploreanddo.com/get-web-nfc-user/${userId}`
        ),
      ]);
      if (!bytes) throw new Error("Failed to encode NFC message.");

      console.log("Encoded NFC message:", bytes);

      // Write the NFC message
      await NfcManager.writeNdefMessage(bytes);
      console.log("NFC write operation completed.");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 1-second delay
      console.log("Link to be written:", link);
      console.log("NFC bytes to write:", bytes);

      Alert.alert("Success", "Link successfully written to the NFC tag!");
    } catch (error) {
      console.error("Error writing to NFC:", error);
      if (error.message.includes("reconnectAfterWrite")) {
        Alert.alert(
          "Error",
          "Failed to write to NFC tag. Please keep the tag in contact and try again."
        );
      } else {
        Alert.alert("Error", error.message || "Failed to write to NFC tag.");
      }
    } finally {
      // Ensure the session is cleaned up in all cases
      await cancelNfcSession();
      console.log("NFC session cleaned up.");
    }
  };

  const writeNFCreconnect2 = async (link) => {
    try {
      console.log("Attempting to write NFC data...");
      await cancelNfcSession(); // Clean up previous sessions
      await NfcManager.requestTechnology(NfcTech.Ndef); // Request NFC tech

      const tag = await NfcManager.getTag();
      console.log("Tag object:", tag);

      // Check tag compatibility
      if (!tag.techTypes.includes("android.nfc.tech.Ndef")) {
        throw new Error("NFC tag is not NDEF-compatible.");
      }

      // Format if needed
      if (!Ndef.isNdef(tag)) {
        console.log("Formatting tag for NDEF...");
        await NfcManager.formatNdef();
      }

      // Encode data
      const bytes = Ndef.encodeMessage([Ndef.uriRecord(link)]);
      if (!bytes) throw new Error("Failed to encode NFC message.");

      console.log("Writing NFC data:", bytes);
      await NfcManager.writeNdefMessage(bytes);

      Alert.alert("Success", "Link successfully written to the NFC tag!");
    } catch (error) {
      console.error("Error writing to NFC:", error);
      Alert.alert("Error", error.message || "Failed to write to NFC tag.");
    } finally {
      await cancelNfcSession();
      console.log("NFC session cleaned up.");
    }
  };

  const writeNFCreconnect3 = async (link) => {
    if (Platform.OS === 'web') {
      Alert.alert("Error", "NFC is not supported on web browsers.");
      return;
    }
    try {
      console.log("Attempting to write NFC data...");
      await cancelNfcSession();
      await NfcManager.requestTechnology(NfcTech.Ndef);
      console.log("NFC Tag detected, ready for operations.");

      const tag = await NfcManager.getTag();
      console.log("Tag object:", tag);

      if (!tag.techTypes.includes("android.nfc.tech.Ndef")) {
        throw new Error("The tag is not NDEF compatible.");
      }

      const bytes = Ndef.encodeMessage([Ndef.uriRecord(link)]);
      if (!bytes) throw new Error("Failed to encode NFC message.");

      console.log("Encoded NFC message:", bytes);

      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      Alert.alert("Success", "Link successfully written to the NFC tag!");
    } catch (error) {
      console.error("Error writing to NFC:", error);
      Alert.alert("Error", error.message || "Failed to write to NFC tag.");
    } finally {
      await cancelNfcSession();
      console.log("NFC session cleaned up.");
    }
  };

  /**
   * Handle writing to the NFC tag
   */
  const handleWrite = async () => {
    if (Platform.OS === 'web') {
      Alert.alert("Error", "NFC is not supported on web browsers.");
      return;
    }
    const link = `https://bc.exploreanddo.com/get-web-nfc-user/${userId}`;
    console.log("Preparing to write NFC tag with link:", link);
    if (await checkNfcState()) {
      await writeNFCreconnect3(link);
    }
  };

  /**
   * Handle sharing profile via QR code
   */
  const handleShare = useCallback(() => {
    handleClickVibration();
    navigation.navigate("Share Profile", {
      qrData: JSON.stringify(userData),
    });
  }, [handleClickVibration, navigation, userData]);

  // Initialize NFC on component mount
  useEffect(() => {
    initializeNFC();
    return () => {
      cancelNfcSession();
    };
  }, []);

  return (
    <View style={styles.rowReader}>
      <View
        style={styles.gradientButtonContainer}
      >
        <TouchableOpacity style={styles.button} onPress={handleWrite}>
          <MaterialCommunityIcons
            name="cellphone-nfc"
            size={20}
            color={"#B37F4D"}
          />
          <Text style={styles.buttonText}>NFC</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.gradientButtonContainer}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={handleShare}
        >
          <Ionicons name="share-social-sharp" size={20} color={"#B1804D"} />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NfcComponent;

const styles = StyleSheet.create({
  rowReader: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
  },
  gradientButtonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    padding: 10,
    borderRadius: 30,
    width: 140,
    height: 40,
    borderColor: "#FABD5F",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "row",
  },
  buttonText: {
    color: "#2B2C2B",
    fontSize: 14,
    fontWeight: "700",
  },
});