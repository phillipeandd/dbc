import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../context/AuthProvider";
import NfcComponent from "../../../components/NfcComponent";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../../../screens/Footer/Footer";

const Theme3_0 = ({ navigation }) => {
  //const [seeUser, setSeeUser] = useState("");
  //console.log("buisnessdetails", seeUser);

  const { width, height } = Dimensions.get("window");
  const {
    userId,
    handleShareProfile,
    handleClickVibration,
    seeUser,
    setSeeUser,
  } = useAuth();
  //console.log("seeUser",seeUser)
  const fetchData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/${userId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSeeUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  useEffect(() => {
    fetchData();
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 3000);
    // return () => clearInterval(intervalId);
  }, [fetchData]);

  const [social, setSocial] = useState("");
  //console.log("social",social)
  const fetchSocialData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/${userId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSocial(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  useEffect(() => {
    fetchSocialData();
    // const intervalId = setInterval(() => {
    //   fetchSocialData();
    // }, 5000);
    // return () => clearInterval(intervalId);
  }, [fetchSocialData]);

  const text = `${
    seeUser?.user?.user_details?.headline
      ? seeUser?.user?.user_details?.headline
      : ""
  }`;

  const handlePhonePress = () => {
    handleClickVibration();
    const phoneNumber = `${seeUser?.phone ? seeUser?.phone : ""}`;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    handleClickVibration();
    const email = `${seeUser?.email ? seeUser?.email : ""}`;
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsitePress = () => {
    handleClickVibration();
    const website = `${
      seeUser?.company?.website
        ? seeUser?.company?.website
        : "http://www.google.com"
    }`;
    //const website = "http://www.google.com";
    Linking.openURL(website);
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
    whatsapp: require("../../../../assets/social/whatsapp.gif"),
    instagram: require("../../../../assets/social/instagram.gif"),
    twitter: require("../../../../assets/social/twitter.gif"),
    linkedIn: require("../../../../assets/social/linkedin.gif"),
    youtube: require("../../../../assets/social/youtube.gif"),
    facebook: require("../../../../assets/social/facebook.gif"),
    skype: require("../../../../assets/social/icons8-skype-48.png"),
    telegram: require("../../../../assets/social/icons8-telegram-48.png"),
    tiktok: require("../../../../assets/social/tiktok.gif"),
    behance: require("../../../../assets/social/icons8-behance-48.png"),
    discord: require("../../../../assets/social/discord.gif"),
    reddit: require("../../../../assets/social/icons8-reddit-48.png"),
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
          style={styles.buttonContainer}
          onPress={() => handleSocialMediaPress(type)}
        >
          <View style={styles.buttonContent}>
            <Image source={imageSource} style={{ width: 45, height: 45 }} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View
        style={[
          {
            elevation: 3,
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            paddingHorizontal: Dimensions.get("window").width * 0.05,
            paddingVertical: Dimensions.get("window").height * 0.01,
            marginTop: Dimensions.get("window").height * 0.09,
            marginHorizontal: Dimensions.get("window").height * 0.02,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
        ]}
      >
        <View style={{ margin: "2%", flexShrink: 1 }}>
          <Text
            style={[
              styles.imageText,
              { fontSize: 24, color: "#2B2261", textAlign: "center" },
            ]}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {seeUser?.company?.companyname
              ? seeUser?.company?.companyname
              : seeUser?.user?.user_details?.company_name}
          </Text>
        </View>
        <LinearGradient
          colors={["#E7D4FC", "#8754DE", "#E7D4FC"]}
          style={[
            styles.gradientBackground,
            {
              borderRadius: 10,
              paddingHorizontal: Dimensions.get("window").width * 0.05,
              paddingVertical: Dimensions.get("window").height * 0.01,
              marginTop: Dimensions.get("window").height * 0.05,
              alignItems: "center",
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
          ]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <View
            style={{
              alignItems: "center",
              position: "relative",
              marginTop: -Dimensions.get("window").height * 0.1,
            }}
          >
            <ImageBackground
              source={require("../../../../assets/circlebg.png")}
              style={{
                width: 300,
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {seeUser && seeUser?.user?.userImage ? (
                <Image
                  source={{
                    uri: `https://bc.exploreanddo.com/${seeUser.user.userImage}`,
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    borderWidth: 3,
                    borderColor: "white",
                    position: "absolute",
                    top: 50,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../../../assets/user.jpg")}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    borderWidth: 3,
                    borderColor: "white",
                    position: "absolute",
                    top: 50,
                  }}
                  resizeMode="contain"
                />
              )}
            </ImageBackground>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 20,
              marginTop: -Dimensions.get("window").height * 0.05,
            }}
          >
            <View style={{ marginTop: "2%", flexShrink: 1 }}>
              <Text
                style={[
                  styles.imageText,
                  { fontSize: 30, color: "black", fontWeight: "400" },
                ]}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {seeUser?.user?.user_details?.businessname
                  ? seeUser?.user?.user_details?.businessname
                  : seeUser?.user?.firstname + " " + seeUser?.user?.lastname}
              </Text>
              <Text
                style={[
                  styles.imageText,
                  { fontSize: 18, color: "white", fontWeight: "400" },
                ]}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {seeUser?.user?.user_details?.title
                  ? seeUser?.user?.user_details?.title
                  : "Employee"}
              </Text>
            </View>
            {seeUser && seeUser?.company?.logo ? (
              <Image
                source={{
                  uri: `https://bc.exploreanddo.com/${seeUser.company.logo}`,
                }}
                style={{ width: 80, height: 80, borderRadius: 20 }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../../assets/social/speclogo.png")}
                style={{ width: 80, height: 80, borderRadius: 20 }}
                resizeMode="contain"
              />
            )}
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#E7D4FC", "#8754DE", "#E7D4FC"]}
          style={[
            styles.gradientBackground,
            {
              borderRadius: 10,
              paddingHorizontal: Dimensions.get("window").width * 0.05,
              paddingVertical: Dimensions.get("window").height * 0.01,
              marginTop: Dimensions.get("window").height * 0.05,
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
          ]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 10,
              marginVertical: 15,
              marginTop: "5%",
            }}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name="phone" size={30} color={"white"} />
            </View>
            <View style={{}}>
              <Text style={[{ color: "white", fontWeight: "bold" }]}>
                Phone
              </Text>
              <Text
                style={[{ color: "black", fontWeight: "400", fontSize: 18 }]}
              >
                {seeUser?.company?.phone
                  ? seeUser?.company?.phone
                  : seeUser?.user?.phone}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 10,
              marginVertical: 15,
            }}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name="mail" size={30} color={"white"} />
            </View>
            <View style={{}}>
              <Text style={[{ color: "white", fontWeight: "bold" }]}>
                Work Email
              </Text>
              <Text
                style={[{ color: "black", fontWeight: "400", fontSize: 18 }]}
              >
                {seeUser?.company?.email
                  ? seeUser?.company?.email
                  : seeUser?.user?.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 10,
              marginVertical: 15,
              marginBottom: "5%",
            }}
            onPress={handleWebsitePress}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="web" size={30} color={"white"} />
            </View>
            <View style={{}}>
              <Text style={[{ color: "white", fontWeight: "bold" }]}>
                Website
              </Text>
              <Text
                style={[{ color: "black", fontWeight: "400", fontSize: 18 }]}
              >
                {seeUser?.company?.website ? seeUser?.company?.website : ""}
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <View
          style={{
            marginTop: "5%",
          }}
        >
          <NfcComponent navigation={navigation} />
        </View>
        <View style={{ marginVertical: "5%" }}>
          <ImageBackground
            source={require("../../../../assets/socialbackground.png")}
            style={{
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
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
      </View>
     
    </ScrollView>
  );
};

export default Theme3_0;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300,
  },
  scrollView: {
    flexGrow: 1,
  },
  gradientBackground: {
    flex: 1,
  },

  buttonContainer: {
    alignItems: "center",
  },
  buttonContent: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#F78380",
    // borderWidth: 1.5,
    // backgroundColor: "#FFF7F7",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button: {
    //paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    fontWeight: "bold",
  },
  buttonText: {
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  rowSocial: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "black",
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  button1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
