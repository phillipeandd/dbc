import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  FlatList,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";

import Svg, {
  Path,
  LinearGradient as MyLinearGradient,
  Stop,
  Defs,
} from "react-native-svg";
import NfcAdmin from "../../../components/NfcAdmin";
import { useRoute } from "@react-navigation/native";
const ATheme4 = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const route = useRoute();
  const empId = route.params.empId;
  const [seeUser, setSeeUser] = useState("");
  //console.log("buisnessdetails", seeUser);
  const { userId, handleShareProfile, handleClickVibration } = useAuth();
  const fetchData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/${empId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSeeUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [empId]);

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
    const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/${empId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSocial(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [empId]);

  useEffect(() => {
    fetchSocialData();
    const intervalId = setInterval(() => {
      fetchSocialData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [fetchSocialData]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSocialData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const text = `${
    seeUser?.data?.user?.user_details?.headline
      ? seeUser?.user?.user_details?.headline
      : ""
  }`;

  const handlePhonePress = () => {
    handleClickVibration();
    const phoneNumber = `${
      seeUser?.data?.user?.phone ? seeUser?.data?.user?.phone : ""
    }`;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    handleClickVibration();
    const email = `${
      seeUser?.data?.user?.email ? seeUser?.data?.user?.email : ""
    }`;
    Linking.openURL(`mailto:${email}`);
  };
  const handleMessagePress = () => {
    handleClickVibration();
    const phoneNumber = `${
      seeUser?.data?.user?.phone ? seeUser?.data?.user?.phone : ""
    }`;
    const message = "Hello, I hope you're doing well!";
    Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
  };

  const handleWebsitePress = () => {
    handleClickVibration();
    // const website = `${
    //   seeUser?.company?.website ? seeUser?.company?.website : ""
    // }`;
    const website = "http://www.google.com";
    Linking.openURL(website);
  };

  const splitTextIntoChunks = (text) => {
    const words = text.split(" ");
    const chunks = [];
    let currentChunk = "";

    for (let i = 0; i < words.length; i++) {
      currentChunk += words[i] + " ";
      if ((i + 1) % 100 === 0) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }
    }
    if (currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
    }
    return chunks;
  };
  const textChunks = splitTextIntoChunks(text);

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
    whatsapp: require("../../../../assets/social/icons8-whatsapp-48.png"),
    instagram: require("../../../../assets/social/icons8-instagram-48.png"),
    twitter: require("../../../../assets/social/icons8-twitter-48.png"),
    linkedIn: require("../../../../assets/social/icons8-linkedin-48.png"),
    youtube: require("../../../../assets/social/icons8-youtube-48.png"),
    facebook: require("../../../../assets/social/icons8-facebook-48.png"),
    skype: require("../../../../assets/social/icons8-skype-48.png"),
    telegram: require("../../../../assets/social/icons8-telegram-48.png"),
    tiktok: require("../../../../assets/social/icons8-tiktok-48.png"),
    behance: require("../../../../assets/social/icons8-behance-48.png"),
    discord: require("../../../../assets/social/icons8-discord-48.png"),
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
          style={[
            styles.button1,
            {
              // backgroundColor: "#FFF7F7",
              // elevation: 0.5,
            },
          ]}
          onPress={() => handleSocialMediaPress(type)}
        >
          <Image source={imageSource} style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={[
          {
            elevation: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            paddingHorizontal: Dimensions.get("window").width * 0.02,
            paddingVertical: Dimensions.get("window").height * 0.01,
            marginVertical: Dimensions.get("window").height * 0.09,
            marginHorizontal: Dimensions.get("window").height * 0.02,
          },
        ]}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {seeUser && seeUser?.data?.user?.userImage ? (
            <Image
              source={{
                uri: `https://bc.exploreanddo.com/${seeUser.data.user.userImage}`,
              }}
              style={{
                width: 300,
                height: 250,
                //marginTop: -50,
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../../../assets/user.jpg")}
              style={{
                width: 300,
                height: 250,
                //marginTop: -50,
              }}
              resizeMode="contain"
            />
          )}
        </View>

        <Svg
          height={80}
          width="100%"
          viewBox="10 0 1440 320"
          style={{ marginTop: "-25%" }}
        >
          <Defs>
            <MyLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#8339FF" />
              <Stop offset="100%" stopColor="#8339FF" />
              <Stop offset="30%" stopColor="white" />
            </MyLinearGradient>
          </Defs>
          <Path
            fill="url(#grad)"
            d="M0,320L40,288C80,256,160,192,240,160C320,128,400,128,480,154.7C560,181,640,235,720,261.3C800,288,880,288,960,261.3C1040,235,1120,181,1200,144C1280,107,1360,85,1400,74.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </Svg>
        <LinearGradient
          colors={["white", "#8339FF"]}
          style={[styles.gradientBackground]}
          start={[0, 0]}
          end={[0, 1]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: "3%",
              gap: 15,
            }}
          >
            {seeUser && seeUser?.company?.logo ? (
              <Image
                source={{
                  uri: `https://bc.exploreanddo.com/${seeUser.company.logo}`,
                }}
                style={{ width: 50, height: 50, borderRadius: 10 }}
                //resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../../assets/social/speclogo.png")}
                style={{ width: 50, height: 50, borderRadius: 10 }}
              />
            )}
            <View>
              <Text
                style={[styles.imageText, { fontSize: 24, color: "#2B2261" }]}
              >
                {seeUser?.data?.user?.user_details?.company_name
                  ? seeUser?.data?.user?.user_details?.company_name
                  : ""}
              </Text>
              <Text style={[styles.imageText, { color: "#2B2261" }]}>
                {seeUser?.data?.user?.user_details?.title
                  ? seeUser?.data?.user?.user_details?.title
                  : "Employee"}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: "8%",
            }}
          >
            <Text
              style={[
                styles.imageText,
                { fontSize: 26, color: "white", fontWeight: "400" },
              ]}
            >
              {seeUser?.data?.user?.user_details?.businessname
                ? seeUser?.data?.user?.user_details?.businessname
                : `${seeUser?.data?.user?.firstname} ${seeUser?.data?.user?.lastname}`}
            </Text>
            <Text
              style={[
                styles.imageText,
                {
                  fontSize: 18,
                  color: "black",
                  fontWeight: "400",
                  fontStyle: "italic",
                },
              ]}
            >
              {seeUser?.data?.user?.user_details?.title
                ? seeUser?.data?.user?.user_details?.title
                : "Employee"}
            </Text>
            <Text
              style={[
                styles.imageText,
                {
                  fontSize: 18,
                  color: "white",
                  fontWeight: "400",
                },
              ]}
            >
              {seeUser?.data?.user?.user_details?.company_name
                ? seeUser?.data?.user?.user_details?.company_name
                : ""}
            </Text>
          </View>
          <View style={styles.horizontalLineContainer}>
            <View style={styles.horizontalLine} />
            <TouchableOpacity
              style={[
                {
                  backgroundColor: "#8339FF",
                  paddingHorizontal: Dimensions.get("window").width * 0.05,
                },
              ]}
            >
              <Text
                style={{
                  color: "white",
                  // fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                CONNECT WITH ME
              </Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
          </View>
          <View
            style={[
              styles.rowSocial,
              {
                // backgroundColor: "#F78380",
                borderRadius: 15,
                paddingHorizontal: Dimensions.get("window").width * 0.05,
                paddingVertical: Dimensions.get("window").height * 0.01,
                gap: 10,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleEmailPress}
            >
              <View style={styles.iconContainer}>
                <MaterialIcons name="mail" size={25} color={"white"} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handlePhonePress}
            >
              <View style={styles.iconContainer}>
                <MaterialIcons name="phone" size={25} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleMessagePress}
            >
              <View style={styles.iconContainer}>
                <MaterialIcons name="message" size={25} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleWebsitePress}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="web" size={25} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                elevation: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 15,
                paddingHorizontal: Dimensions.get("window").width * 0.05,
                paddingVertical: Dimensions.get("window").height * 0.01,
                marginVertical: Dimensions.get("window").height * 0.03,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              },
            ]}
          >
            <Text
              style={{
                color: "#8339FF",
                fontWeight: "500",
              }}
            >
              Highlight
            </Text>
            {textChunks.map((chunk, index) => (
              <Text
                Text
                key={index}
                style={[
                  styles.imageText,
                  { textAlign: "center", color: "black" },
                ]}
              >
                {chunk}
              </Text>
            ))}
          </View>

          <NfcAdmin navigation={navigation} empId={empId} />
          {/* <View>
            {socialKeys.map((type) => {
              const value = social[type];
              //console.log("value", value);
              if (value !== "null" && value !== null && value !== "") {
                let iconComponent;
                let iconName;
                switch (type) {
                  case "whatsapp":
                    iconName = "whatsapp";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  case "instagram":
                    iconName = "instagram";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  case "twitter":
                    iconName = "twitter";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  case "linkedIn":
                    iconName = "linkedin";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  case "youtube":
                    iconName = "youtube";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  case "facebook":
                    iconName = "facebook";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  case "skype":
                    iconName = "skype";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  case "telegram":
                    iconName = "telegram";
                    iconComponent = FontAwesome;
                    break;
                  case "tiktok":
                    iconName = "tiktok";
                    iconComponent = FontAwesome5;
                    break;
                  case "behance":
                    iconName = "behance";
                    iconComponent = FontAwesome;
                    break;
                  case "discord":
                    iconName = "discord";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  case "reddit":
                    iconName = "reddit";
                    iconComponent = MaterialCommunityIcons;
                    break;
                  default:
                    iconName = "information-off";
                    iconComponent = MaterialCommunityIcons;
                    break;
                }

                const Icon = iconComponent;
                return (
                  <TouchableOpacity
                    key={type}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: "2%",
                    }}
                    onPress={() => handleSocialMediaPress(type)}
                  >
                    <LinearGradient
                      colors={["#8339FF", "#9967FF"]}
                      start={[0, 0]}
                      end={[1, 1]}
                      style={[
                        styles.button,
                        {
                          backgroundColor: "#F78380",
                          width: Dimensions.get("window").width * 0.7,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                      ]}
                      //onPress={() => handleSocialMediaPress(type)}
                    >
                      <Icon
                        name={iconName}
                        size={25}
                        color={"white"}
                        style={{ marginRight: 5 }}
                      />

                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {value}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              } else {
                return null;
              }
            })}
          </View> */}

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
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default ATheme4;

const styles = StyleSheet.create({
  svgcontainer: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  gradientBackground: {
    //borderBottomLeftRadius: 50,
    //borderBottomRightRadius: 50,
    //alignItems: "center",
    //justifyContent: "space-around",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  content: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: Dimensions.get("window").width * 0.01,
    marginTop: Dimensions.get("window").height * 0.11,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#8339FF",
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: Dimensions.get("window").height * 0.02,
  },
  horizontalLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "black",
  },

  row: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  rowSocial: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  waveContainer: {
    overflow: "hidden",
  },
  wave: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
    marginHorizontal: 10,
  },
  button1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderColor: "#F78380",
    // borderWidth: 1.5,
  },
});
