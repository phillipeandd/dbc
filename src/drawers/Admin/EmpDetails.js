import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ScrollView,
  Linking,
  Share,
  FlatList,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import axios from "axios";
import QRCode from "react-native-qrcode-svg";

import Toast from "react-native-toast-message";
import { useAuth } from "../../context/AuthProvider";
import AdminFooter from "../../screens/Footer/AdminFooter";
import { useRoute } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { ImageBackground } from "react-native";
const EmpDetails = ({ navigation }) => {
  const { userId, handleClickVibration } = useAuth();
  const { width, height } = Dimensions.get("window");
  const route = useRoute();
  const nfcUserDetails = route.params.nfcUserDetails;
  //console.log("nfcUserDetails", nfcUserDetails);
  const userEmpIdFromNfcUserDetails =
    route.params.nfcUserDetails?.nfc_users?.user_details?.user_id;
  //console.log("userEmpIdFromNfcUserDetails", userEmpIdFromNfcUserDetails);

  const companyDetails = route.params.companyDetails;
  //console.log("companyDetails", companyDetails);
  const [social, setSocial] = useState("");

  const fetchSocialData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/${userEmpIdFromNfcUserDetails}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSocial(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userEmpIdFromNfcUserDetails]);

  useEffect(() => {
    fetchSocialData();
    // const intervalId = setInterval(() => {
    //   fetchSocialData();
    // }, 5000);
    // return () => clearInterval(intervalId);
  }, [fetchSocialData]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSocialData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleShareProfile = async () => {
    handleClickVibration();
    try {
      const message = `Hello, connect with me here! on this link https://bc.exploreanddo.com/get-web-nfc-user/${userEmpIdFromNfcUserDetails}`;
      await Share.share({
        message: message,
        title: "Share Profile",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const GridItem = ({ icon, label, description }) => {
    return (
      <TouchableOpacity style={styles.gridItem}>
        <MaterialIcons name={icon} size={30} color="black" />
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    );
  };

  const ImageWithText = () => {
    return (
      <View style={styles.imageContainer}>
        {nfcUserDetails && nfcUserDetails?.nfc_users?.users?.userImage ? (
          <Image
            source={{
              uri: `https://bc.exploreanddo.com/${nfcUserDetails?.nfc_users?.users?.userImage}`,
            }}
            style={styles.image}
            //resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../../../assets/user.jpg")}
            style={styles.image}
            //resizeMode="contain"
          />
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View>
            <Text style={[styles.imageText, { marginTop: "-8%" }]}>
              {nfcUserDetails?.nfc_users?.users?.firstname
                ? nfcUserDetails?.nfc_users?.users?.firstname
                : ""}{" "}
              {nfcUserDetails?.nfc_users?.users?.lastname
                ? nfcUserDetails?.nfc_users?.users?.lastname
                : ""}
            </Text>
          </View>
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Admin Display", {
                empId: nfcUserDetails?.nfc_users?.users?.id,
              });
            }}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={24}
              color="white"
            />
            
          </TouchableOpacity>
        </View>
        <Text style={[styles.imageText, { fontSize: 14 }]}>
          {nfcUserDetails?.nfc_users?.user_details?.title
            ? nfcUserDetails?.nfc_users?.user_details?.title
            : "Employee"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 50,
            margin: 5,
          }}
        >
          {companyDetails && companyDetails?.logo ? (
            <Image
              source={{
                uri: `https://bc.exploreanddo.com/${nfcUserDetails?.nfc_users?.branch?.logo}`,
              }}
              style={{ width: 30, height: 30, borderRadius: 10 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../../assets/social/speclogo.png")}
              style={{ width: 30, height: 30, borderRadius: 10 }}
            />
          )}

          <View>
            <Text style={[styles.imageText, { fontSize: 12 }]}>
              {nfcUserDetails?.nfc_users
                ? nfcUserDetails?.nfc_users?.branch?.branch_name
                : companyDetails?.companyname}
            </Text>
            <Text style={[styles.imageText, { fontSize: 10 }]}>
              {nfcUserDetails?.nfc_users
                ? nfcUserDetails?.nfc_users?.branch?.email
                : companyDetails?.email}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // const [userData, setUserData] = useState(
  //   `https://bc.exploreanddo.com/get-web-nfc-user/${userEmpIdFromNfcUserDetails}`
  // );
  // const handleShare = () => {
  //   handleClickVibration();
  //   // Generate QR code data based on user data
  //   const qrData = JSON.stringify(userData);
  //   // Navigate to Share Profile screen
  //   navigation.navigate("Share Profile", { qrData });
  // };

  const [userData, setUserData] = useState("");

  const handleShare = () => {
    handleClickVibration();
    // Generate userData based on the current value of userEmpIdFromNfcUserDetails
    const newUserData = `https://bc.exploreanddo.com/get-web-nfc-user/${userEmpIdFromNfcUserDetails}`;
    setUserData(newUserData);

    // Generate QR code data based on user data
    const qrData = JSON.stringify(newUserData);
    // Navigate to Share Profile screen
    navigation.navigate("Share Profile", {
      qrData,
      userEmpIdFromNfcUserDetails,
    });
  };

  const handleWriteToNFC = async () => {
    handleClickVibration();
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const uri = "https://example.com";
      const bytes = NfcManager.stringToBytes(uri);
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      console.log("Successfully wrote to NFC tag");
    } catch (error) {
      console.error("Error writing to NFC tag:", error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const handleReadFromNFC = async () => {
    handleClickVibration();
    try {
      // Request NFC session
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Read data from NFC tag
      const tag = await NfcManager.getTag();
      if (tag) {
        if (tag.ndefMessage) {
          const uri = NfcManager.bytesToString(tag.ndefMessage[0].payload);
          // Open the link in a browser
          Linking.openURL(uri);
        } else {
          console.log("NFC tag does not contain NDEF message");
        }
      } else {
        console.log("No NFC tag detected");
      }
    } catch (error) {
      console.error("Error reading from NFC tag:", error);
    } finally {
      // Close NFC session
      NfcManager.cancelTechnologyRequest();
    }
  };

  const socialKeys = [
    "whatsapp",
    "twitter",
    "linkedIn",
    "youtube",
    "facebook",
    "skype",
    "telegram",
    "tiktok",
    "instagram",
    "behance",
    "discord",
    "reddit",
  ];

  const handleSocialMediaPress = (type) => {
    switch (type) {
      case "whatsapp":
        handleWhatsAppPress();
        break;
      case "instagram":
        handleInstagramPress();
        break;
      case "twitter":
        handleTwitterPress();
        break;
      case "facebook":
        handleFacebookPress();
        break;
      case "linkedIn":
        handleLinkedInPress();
        break;
      case "telegram":
        handleTelegramPress();
        break;
      case "tiktok":
        handleTikTokPress();
        break;
      case "youtube":
        handleYouTubePress();
        break;
      case "behance":
        handleBehancePress();
        break;
      case "discord":
        handleDiscordPress();
        break;
      case "skype":
        handleSkypePress();
        break;
      case "reddit":
        handleRedditPress();
        break;
      default:
        console.log("Invalid social media type");
        break;
    }
  };

  const handleWhatsAppPress = () => {
    handleClickVibration();
    const phoneNumber = social?.whatsapp;
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Number is invalid or WhatsApp is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleInstagramPress = () => {
    handleClickVibration();
    const userName = social?.instagram;
    Linking.openURL(`instagram://user?username=${userName}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username is invalid or Instagram is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };
  const handleTwitterPress = () => {
    handleClickVibration();
    const userName = social?.twitter;
    Linking.openURL(`twitter://user?screen_name=${userName}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username is invalid or Twitter is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleFacebookPress = () => {
    handleClickVibration();
    const facebookId = social?.facebook;
    const email = social?.facebook;

    if (facebookId) {
      const facebookUrl = `fb://profile/${facebookId}`;
      Linking.openURL(facebookUrl).catch(() => {
        openFacebookProfileInBrowser(email);
      });
    } else if (email) {
      openFacebookProfileInBrowser(email);
    } else {
      Toast.show({
        type: "error",
        text1: `No Facebook profile or email provided`,
        position: "top",
        visibilityTime: 4000,
      });
    }
  };

  const openFacebookProfileInBrowser = (email) => {
    const webUrl = `https://www.facebook.com/search/top/?q=${encodeURIComponent(
      email
    )}`;
    Linking.openURL(webUrl).catch(() => {
      Toast.show({
        type: "error",
        text1: `Please use a web browser to proceed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleLinkedInPress = () => {
    handleClickVibration();
    const userName = social?.linkedin;
    Linking.openURL(`linkedin://profile/${userName}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username is invalid or LInkedIn is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleTelegramPress = () => {
    handleClickVibration();
    const userOrNumber = social?.telegram;
    const isUsername = isNaN(userOrNumber);
    if (isUsername) {
      Linking.openURL(`tg://resolve?domain=${userOrNumber}`).catch(() => {
        Toast.show({
          type: "error",
          text1: `Username is invalid or Telegram is not installed`,
          position: "top",
          visibilityTime: 4000,
        });
      });
    } else {
      Linking.openURL(`tel:${userOrNumber}`).catch(() => {
        Toast.show({
          type: "error",
          text1: `Number is invalid or Telegram is not installed`,
          position: "top",
          visibilityTime: 4000,
        });
      });
    }
  };

  const handleTikTokPress = () => {
    handleClickVibration();
    const userName = social?.tiktok;
    Linking.openURL(`tiktok://user?screen_name=${userName}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username is invalid or Tiktok is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleYouTubePress = () => {
    handleClickVibration();
    const channelId = social?.youtube;
    Linking.openURL(`youtube://channel/${channelId}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username or Channel Id is invalid.`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleBehancePress = () => {
    handleClickVibration();
    const userName = social?.behance;
    Linking.openURL(`behance://user/${userName}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username is invalid or Behance is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleDiscordPress = () => {
    handleClickVibration();
    const inviteCode = social?.discord;
    Linking.openURL(`https://discord.com/invite/${inviteCode}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username is invalid or Discord is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleSkypePress = () => {
    handleClickVibration();
    const userName = social?.skype;
    Linking.openURL(`skype:${userName}?chat`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username is invalid or Skype is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const handleRedditPress = () => {
    handleClickVibration();
    const userName = social?.reddit;
    Linking.openURL(`reddit://user/${userName}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Username is invalid or Reddit is not installed`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  const imageSources = {
    whatsapp: require("../../../assets/social/whatsapp.gif"),
    instagram: require("../../../assets/social/instagram.gif"),
    twitter: require("../../../assets/social/twitter.gif"),
    linkedIn: require("../../../assets/social/linkedin.gif"),
    youtube: require("../../../assets/social/youtube.gif"),
    facebook: require("../../../assets/social/facebook.gif"),
    skype: require("../../../assets/social/icons8-skype-48.png"),
    telegram: require("../../../assets/social/icons8-telegram-48.png"),
    tiktok: require("../../../assets/social/tiktok.gif"),
    behance: require("../../../assets/social/icons8-behance-48.png"),
    discord: require("../../../assets/social/discord.gif"),
    reddit: require("../../../assets/social/icons8-reddit-48.png"),
  };

  const renderItem = ({ item }) => {
    const { type, value } = item;
    if (!value || value === "null" || value === "") {
      return null;
    }
    const imageSource = imageSources[type];
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <TouchableOpacity
          style={[
            styles.button1,
            {
              // backgroundColor: "white",
              // elevation: 0.5,
            },
          ]}
          onPress={() => handleSocialMediaPress(type)}
        >
          <Image source={imageSource} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={["white", "#E3D1FF"]}
      style={styles.gradientBackground}
      start={[0, 0]}
      end={[0, 1]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageWithText />

        <View style={styles.container}>
          <View style={styles.row}>
            <GridItem
              icon="phone-iphone"
              label="Mobile Number"
              description={
                nfcUserDetails?.nfc_users?.users?.phone
                  ? nfcUserDetails?.nfc_users?.users?.phone
                  : ""
              }
            />
            <View style={styles.plusLine} />
            <GridItem
              icon="mail"
              label="Email Address"
              description={
                nfcUserDetails?.nfc_users
                  ? nfcUserDetails?.nfc_users?.branch?.email
                  : nfcUserDetails?.nfc_users?.users?.email
              }
            />
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.row}>
            <GridItem
              icon="web"
              label="Website"
              description={
                companyDetails?.company_details?.website
                  ? companyDetails?.company_details?.website
                  : ""
              }
            />
            <View style={styles.plusLine} />
            <GridItem
              icon="location-on"
              label="Location"
              description={
                companyDetails?.company_details?.address
                  ? companyDetails?.company_details?.address
                  : ""
              }
            />
          </View>

          <View style={styles.rowReader}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#9968FF", width: width * 0.4 },
              ]}
              onPress={handleReadFromNFC}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                <MaterialCommunityIcons
                  name="cellphone-nfc"
                  size={15}
                  color={"white"}
                />{" "}
                Write to NFC
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#9968FF", width: width * 0.4 },
              ]}
              // onPress={() => navigation.navigate("Share Profile")}
              onPress={handleShare}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                <FontAwesome name="send-o" size={15} color={"white"} /> Share
              </Text>
            </TouchableOpacity>
          </View>
          <ImageBackground
            source={require("../../../assets/socialbackground.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <FlatList
              data={socialKeys
                .filter((type) => {
                  const value = social[type];
                  return value !== "null" && value !== null && value !== "";
                })
                .map((type) => ({ type, value: social[type] }))}
              renderItem={renderItem}
              keyExtractor={(item) => item.type}
              numColumns={4}
              contentContainerStyle={styles.flatListContainer}
            />
          </ImageBackground>
        </View>
      </ScrollView>

      <AdminFooter navigation={navigation} />
    </LinearGradient>
  );
};

export default EmpDetails;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 200,
  },
  scrollView: {
    flexGrow: 1,
  },
  gradientBackground: {
    //flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#9968FF",
    borderRadius: 15,
    width: "80%",
    alignSelf: "center",
    marginTop: 30,
  },
  image: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -30,
    borderWidth: 1,
    borderColor: "#9968FF",
  },
  imageText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },

  buttonContainer: {
    alignItems: "center",
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonText: {
    //marginTop: 5,
  },
  row: {
    flexDirection: "row",
    //marginBottom: 20,
    alignItems: "center",
  },
  rowSocial: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  rowReader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 100,
  },
  gridItem: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    marginTop: 15,
  },
  label: {
    color: "#9968FF",
    marginTop: 10,
  },
  description: {
    color: "black",
    marginTop: 5,
  },
  plusLine: {
    width: 1,
    backgroundColor: "#9968FF",
    marginHorizontal: 10,
    height: 160,
  },
  horizontalLine: {
    width: "80%",
    height: 1,
    backgroundColor: "#9968FF",
  },
  button: {
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderWidth: 0.3,
    // borderColor: "gray"
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
});
