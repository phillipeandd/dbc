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
  RefreshControl,
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
const Theme3 = ({ navigation }) => {
  const {
    userId,
    handleShareProfile,
    handleClickVibration,
    seeUser,
    setSeeUser,
  } = useAuth();
  //console.log("social",social)
  //console.log("seeUser", seeUser);
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
  }, [fetchSocialData]);

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
    const website = `${seeUser?.company?.website
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
            <Image source={imageSource} style={{ width: 35, height: 35 }} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSocialData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.container}>
        <LinearGradient
          colors={['#8C78F0', '#E9D7FC', '#8C78F0']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.profileCard}
        >

          <ImageBackground
            source={require('../../../../assets/circle3.3.png')}
            style={styles.profilebgImage}
          >
            {seeUser && seeUser?.user?.userImage ? (
              <Image
                source={{
                  uri: `https://bc.exploreanddo.com/${seeUser.user.userImage}`,
                }}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={require('../../../../assets/user.jpg')}
                style={styles.avatar}
              />
            )}
          </ImageBackground>

          <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
            <View>
              <Text style={styles.name}>{seeUser?.user?.firstname} {seeUser?.user?.lastname}</Text>
              <Text style={styles.title}> {seeUser?.user?.user_details?.title}</Text>
            </View>

            {seeUser && seeUser?.company?.logo ? (
              <Image
                source={{
                  uri: `https://bc.exploreanddo.com/${seeUser.company.logo}`,
                }}
                style={styles.icon}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../../assets/social/speclogo.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            )}
          </View>

        </LinearGradient>
        <LinearGradient
          colors={['#8C78F0', '#E9D7FC', '#8C78F0']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.infoContainer, { backgroundColor: '#E9D7FC' }]}
        >
          <TouchableOpacity style={styles.infoRow} onPress={handlePhonePress}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="phone"
                size={25}
                color={"white"}
              />
            </View>
            <View>
              <Text style={styles.infoTextHead}>Phone</Text>
              <Text style={styles.infoText}>{seeUser?.user?.phone}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} onPress={handleEmailPress}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="alternate-email"
                size={25}
                color={"white"}

              />
            </View>
            <View>
              <Text style={styles.infoTextHead}>Email</Text>
              <Text style={styles.infoText}>{seeUser?.user?.email}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} onPress={handleWebsitePress}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="web-check"
                size={25}
                color={"white"}
              />
            </View>

            <View>
              <Text style={styles.infoTextHead}>Website</Text>

              <Text style={styles.infoText}>
                {seeUser?.socialize?.website || seeUser?.company?.website || ''}
              </Text>

            </View>
          </TouchableOpacity>

        </LinearGradient>
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

export default Theme3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingBottom: Dimensions.get('window').width * 1,
    alignItems: 'center',
    paddingTop: 50
  },
  profilebgImage: {
    flex: 1,
    width: '100%',
    height: "auto",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 45,
    borderWidth: 2,
    borderColor: "white"
  },
  profileCard: {
    width: '80%',
    borderRadius: 15,
    // padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,

  },
  buttonContent: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
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

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: "white"
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30
  },
  infoContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,

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
    color: '#895ECD',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});
