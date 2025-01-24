import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import NfcComponent from "../../../components/NfcComponent";
import { RefreshControl } from "react-native";
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const Theme6 = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const {
    userId,
    handleClickVibration,
    seeUser,
    setSeeUser,
  } = useAuth();
  //console.log("seeUser", seeUser)
  const fetchData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/${userId}`;
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
  }, [fetchData]);

  const [social, setSocial] = useState("");
  const fetchSocialData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/${userId}`;
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

  const handlePhonePress = () => {
    handleClickVibration();
    const phoneNumber = `${seeUser?.company?.phone ? seeUser?.company?.phone : ""
      }`;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    handleClickVibration();
    const email = `${seeUser?.company?.email ? seeUser?.company?.email : ""}`;
    Linking.openURL(`mailto:${email}`);
  };
  const handleMessagePress = () => {
    handleClickVibration();
    const phoneNumber = `${seeUser?.company?.phone ? seeUser?.company?.phone : ""
      }`;
    const message = "Hello, I hope you're doing well!";
    Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
  };

  const handleWebsitePress = () => {
    handleClickVibration();
    const website = `${seeUser?.socialize?.website
      ? seeUser?.socialize?.website
      : "https://www.google.com"
      }`;
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>

        <View style={styles.header}>
          {seeUser && seeUser?.user?.userImage ? (
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: `https://bc.exploreanddo.com/${seeUser.user.userImage}`,
                }}
                style={styles.avatar}
              />
              {seeUser?.company?.logo ? (
                <Image
                  source={{
                    uri: `https://bc.exploreanddo.com/${seeUser.company.logo}`,
                  }}
                  style={styles.logo}
                  // resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../../../assets/social/speclogo.png")}
                  style={styles.logo}
                  // resizeMode="contain"
                />
              )}
            </View>
          ) : (
            <Image
              source={require('../../../../assets/user.jpg')}
              style={styles.avatar}
            />
          )}
          

          <Svg height="40" width="100%">
            <Defs>
              <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#7f00ff" stopOpacity="1" />
                <Stop offset="100%" stopColor="#35C7F3" stopOpacity="1" />
              </SvgLinearGradient>
            </Defs>
            <SvgText
              fill="url(#grad)"
              x="40%"
              y="30"
              fontSize="28"
              fontWeight="bold"
              textAnchor="middle"
            >
              {seeUser?.user?.firstname}       {seeUser?.user?.lastname}
            </SvgText>
          </Svg>

        </View>
        <View style={styles.infoContainerIn}>
          <LinearGradient
            colors={['#35C7F3', '#7f00ff']}
            style={styles.gradientBorder}
          >
            <View style={styles.content}>
              <Text style={styles.textLeft}>{seeUser?.user?.user_details?.title}</Text>
              <View style={styles.divider} />
              <Text style={styles.textRight}> {seeUser?.user?.user_details?.company_name}</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoRow} onPress={handlePhonePress}>
            <MaterialIcons
              name="phone"
              size={25}
              color={"gray"}
              style={{ marginRight: 5 }}
            />
            <View>
              <Text style={styles.infoTextHead}>Phone</Text>
              <Text style={styles.infoText}>{seeUser?.user?.phone}</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} onPress={handleEmailPress}>
            <MaterialIcons
              name="alternate-email"
              size={25}
              color={"gray"}
              style={{ marginRight: 5 }}
            />
            <View>
              <Text style={styles.infoTextHead}>Email</Text>
              <Text style={styles.infoText}>{seeUser?.user?.email}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} onPress={handleWebsitePress}>
            <MaterialCommunityIcons
              name="web-check"
              size={25}
              color={"gray"}
              style={{ marginRight: 5 }}
            />
            <View>
              <Text style={styles.infoTextHead}>Website</Text>
              <Text style={styles.infoText}>{seeUser?.socialize?.website || seeUser?.company?.website || ''}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <MaterialIcons
              name="gps-fixed"
              size={25}
              color={"gray"}
              style={{ marginRight: 5 }}
            />
            <View>
              <Text style={styles.infoTextHead}>Location</Text>
              <Text style={styles.infoText}>
                {seeUser?.user?.user_details?.address}
              </Text>
            </View>
          </View>
        </View>
        <NfcComponent navigation={navigation} />

   

        <ImageBackground
          source={require('../../../../assets/socialbackground.png')}
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
  );
};
export default Theme6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingBottom: Dimensions.get('window').width * 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100,

  },
  gradientBackground: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
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

  logo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth:1,
    borderColor:"black"
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 16,
    color: '#888',
  },
  infoContainerIn: {
    padding: 10,
    borderRadius: 10,
    margin: 15,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 25,
    padding: 5,
  },
  infoTextHead: {
    fontSize: 16,
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  gradientButtonContainer: {
    borderRadius: 10, // Adjust according to your design
  },
  saveAndSocialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    padding: 10,
  },
  saveContactButton: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: "gray"
  },
  saveContactText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // White background for the inside
    borderRadius: 8,
    padding: 10,
  },
  textLeft: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  textRight: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)', // Adjust color for divider
    marginHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:30
  },
});

