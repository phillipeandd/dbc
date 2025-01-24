import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Linking,
  Clipboard,
  Share,
} from "react-native";
import React, { useRef } from "react";
import {
  EvilIcons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { useAuth } from "../../../context/AuthProvider";
import AdminFooter from "../../../screens/Footer/AdminFooter";
import Footer from "../../../screens/Footer/Footer";

const ShareProfile = ({ route, navigation }) => {
  const { handleClickVibration, roleOf, handleShareProfile } = useAuth();
  const qrCodeRef = useRef();
  const { qrData } = route.params;

  const handleCopyToClipboard = async () => {
    handleClickVibration();
    const cleanQrData = qrData.replace(/"/g, "");
    await Clipboard.setString(cleanQrData);
    Alert.alert("Copied to clipboard", cleanQrData);
  };

  // const requestCameraRollPermission = async () => {
  //   try {
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       alert(
  //         "Permission to access camera roll is required to save QR code to gallery"
  //       );
  //       return false;
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error("Error requesting camera roll permission:", error);
  //     return false;
  //   }
  // };

  const requestCameraRollPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please allow access to save photos.");
      return false;
    }
    return true;
  };

  const saveToGallery = async () => {
    try {
      const permissionGranted = await requestCameraRollPermission();
      if (!permissionGranted) {
        return;
      }

      // Capture the View containing the QR code
      const uri = await captureRef(qrCodeRef, {
        format: "png",
        quality: 1,
      });

      // Save the captured image directly to the gallery
      await MediaLibrary.createAssetAsync(uri);

      Alert.alert("Success", "QR Code saved to gallery successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save QR Code to gallery");
      console.error("Save Error: ", error);
    }
  };

  // const saveToGallery = async () => {
  //   handleClickVibration();
  //   try {
  //     const permissionGranted = await requestCameraRollPermission();
  //     if (!permissionGranted) {
  //       return;
  //     }
  //     const uri = await captureRef(qrCodeRef, {
  //       format: "png",
  //       quality: 1,
  //     });
  //     const asset = await MediaLibrary.createAssetAsync(uri);
  //     await MediaLibrary.saveToLibraryAsync(asset);
  //     Alert.alert("Success", "QR Code saved to gallery successfully!");
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to save QR Code to gallery");
  //     console.error(error);
  //   }
  // };

  //console.log("qrData", qrData);

  const handleShareViaSMS = () => {
    handleClickVibration();
    const message = `Hello! Connect me through SMS. Click the below link to connect ${qrData}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl);
  };

  const handleShareViaEmail = () => {
    handleClickVibration();
    const email = "recipient@example.com";
    const subject = "Subject";
    const body = `Hello! Connect me through mail. Click the below link to connect ${qrData}`;
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(emailUrl);
  };

  const handleShareViaWhatsApp = () => {
    handleClickVibration();
    const message = `Hello! Connect me through SMS. Click the below link to connect ${qrData}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappUrl);
  };

  const handleShareProfileAdmin = async () => {
    handleClickVibration();
    try {
      const message = `Hello, connect with me here! Click the below link to connect ${qrData}`;
      await Share.share({
        message: message,
        title: "Share Profile",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginVertical: 10 }}>
        {/* <View
          style={{
            //  flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode value={qrData.replace(/"/g, "")} ref={qrCodeRef} />
        </View> */}
        <View
          ref={qrCodeRef}
          collapsable={false}
          style={{
            backgroundColor: "white",
            padding: 20,
            marginHorizontal: 20,
            marginBottom: 5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode value={qrData.replace(/"/g, "")} size={120} />
        </View>
        <Text
          style={{
            marginHorizontal: 20,
            marginBottom: 5,
            fontWeight: "bold",
            color: "#604A49",
          }}
        >
          Link
        </Text>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons
                name="user"
                size={40}
                color="#604A49"
                style={{ marginRight: 5 }}
              />
              <TouchableOpacity onPress={handleCopyToClipboard}>
                <Text style={{ color: "#604A49" }}>
                  {qrData.replace(/"/g, "").length > 40
                    ? qrData.replace(/"/g, "").substring(0, 40) + "..."
                    : qrData.replace(/"/g, "")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <MaterialIcons
                name="chevron-right"
                size={40}
                color="#604A49"
                onPress={handleCopyToClipboard}
              />
            </View>
          </View>
        </View>
        <Text
          style={{
            marginHorizontal: 20,
            marginBottom: 5,
            fontWeight: "bold",
            color: "#604A49",
          }}
        >
          Face to face sharing
        </Text>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="wallet"
                size={30}
                color="#604A49"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Add to Apple Wallet
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <MaterialIcons name="chevron-right" size={40} color="#604A49" />
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={saveToGallery}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="qrcode"
                  size={30}
                  color="#604A49"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Save QR Code to Photos
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <MaterialIcons name="chevron-right" size={40} color="#604A49" />
            </View>
          </View>
        </View>
        <Text
          style={{
            marginHorizontal: 20,
            marginBottom: 5,
            fontWeight: "bold",
            color: "#604A49",
          }}
        >
          Remote Sharing
        </Text>
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 5,
          }}
        >
          <TouchableOpacity onPress={handleCopyToClipboard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="link"
                  size={30}
                  color="#604A49"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Copy Link
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <MaterialIcons name="chevron-right" size={40} color="#604A49" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShareViaSMS}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="message"
                  size={30}
                  color="blue"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Share via SMS
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <MaterialIcons name="chevron-right" size={40} color="#604A49" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShareViaEmail}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="email"
                  size={30}
                  color="#604A49"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Share via Email
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <MaterialIcons name="chevron-right" size={40} color="#604A49" />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShareViaWhatsApp}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={30}
                  color="green"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Share via Whatsapp
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <MaterialIcons name="chevron-right" size={40} color="#604A49" />
              </View>
            </View>
          </TouchableOpacity>
          {roleOf === "2" ? (
            <>
              <TouchableOpacity onPress={handleShareProfileAdmin}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name="share-all"
                      size={30}
                      color="green"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Share via Options
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <MaterialIcons
                      name="chevron-right"
                      size={40}
                      color="#604A49"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={handleShareProfile}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name="share-all"
                      size={30}
                      color="green"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      Share via Options
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <MaterialIcons
                      name="chevron-right"
                      size={40}
                      color="#604A49"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      {roleOf === "2" ? (
        <>
          <AdminFooter navigation={navigation} />
        </>
      ) : (
        <>
          <Footer navigation={navigation} />
        </>
      )}
    </>
  );
};

export default ShareProfile;

const styles = StyleSheet.create({});
