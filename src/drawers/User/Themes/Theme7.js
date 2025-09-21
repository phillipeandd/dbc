import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Image,
  Linking,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import NfcComponent from "../../../components/NfcComponent";

const Theme7 = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { userId, handleClickVibration, seeUser, setSeeUser } = useAuth();

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

  const [social, setSocial] = useState({});
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
    const phoneNumber = `${seeUser?.user?.phone || ""}`;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    handleClickVibration();
    const email = `${seeUser?.user?.email || ""}`;
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsitePress = () => {
    handleClickVibration();
    const website = `${seeUser?.company?.website || "https://www.google.com"}`;
    Linking.openURL(website);
  };

  const handleLocationPress = () => {
    handleClickVibration();
    const address = seeUser?.user?.user_details?.address || "";
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`);
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
        text1: `Username is invalid or LinkedIn is not installed`,
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
        text1: `Username is invalid or TikTok is not installed`,
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
        text1: `Username or Channel ID is invalid`,
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

  const renderItem = ({ item }) => {
    const { type, value } = item;
    if (!value || value === "null" || value === "") {
      return null;
    }
    const imageSource = imageSources[type];
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialMediaPress(type)}
        >
          <Image source={imageSource} style={styles.socialIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
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

  // Filter social media items that have valid values
  const validSocialItems = socialKeys.filter(
    (type) => social && social[type] && social[type] !== "null" && social[type] !== ""
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <LinearGradient
          colors={["#FFFFFF", "#F8FAFE"]}
          style={styles.headerGradient}
          start={[0, 0]}
          end={[0, 1]}
        >
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
              {seeUser && seeUser?.user?.userImage ? (
                <Image
                  source={{
                    uri: `https://bc.exploreanddo.com/${seeUser.user.userImage}`,
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require("../../../../assets/user.jpg")}
                  style={styles.profileImage}
                />
              )}
            </View>
          </View>
          
          {/* Name and Title */}
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {seeUser?.user?.firstname || "Alan"} {seeUser?.user?.lastname || "Smith"}
            </Text>
            <Text style={styles.titleText}>
              {seeUser?.user?.user_details?.title || "Android Driver"}
            </Text>
            <View style={styles.companyBadge}>
              <Text style={styles.companyText}>
                {seeUser?.company?.companyname || seeUser?.user?.user_details?.company_name || "Maximum Horizon AI"}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* About Me Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <View style={styles.divider} />
        <Text style={styles.aboutText}>
          {seeUser?.user?.user_details?.headline || 
           "Lorem ipsum dolor sit amet consectetur adipiscing elit."}
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
          <View style={styles.contactIconContainer}>
            <MaterialIcons name="phone" size={20} color="#2C3E50" />
          </View>
          <Text style={styles.contactText}>
            {seeUser?.user?.phone || "6265898600"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
          <View style={styles.contactIconContainer}>
            <MaterialIcons name="email" size={20} color="#2C3E50" />
          </View>
          <Text style={styles.contactText}>
            {seeUser?.user?.email || "alan@gmail.com"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
          <View style={styles.contactIconContainer}>
            <MaterialCommunityIcons name="web" size={20} color="#2C3E50" />
          </View>
          <Text style={styles.contactText}>
            {seeUser?.company?.website || "https://engloremundi"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleLocationPress}>
          <View style={styles.contactIconContainer}>
            <MaterialIcons name="location-on" size={20} color="#2C3E50" />
          </View>
          <Text style={styles.contactText}>
            {seeUser?.user?.user_details?.address || "Hyderabad"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Section */}
      {validSocialItems.length > 0 && (
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Connect with me</Text>
          <View style={styles.divider} />
          <View style={styles.socialMediaGrid}>
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
          </View>
        </View>
      )}

      {/* NFC Component */}
      <View style={styles.nfcSection}>
        <NfcComponent navigation={navigation} />
      </View>

      {/* Save Contact Button */}
      <View style={styles.saveContactSection}>
        <TouchableOpacity style={styles.saveContactButton}>
          <MaterialIcons name="person-add" size={24} color="#FFFFFF" />
          <Text style={styles.saveContactText}>Save Contact</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Theme7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerSection: {
    height: Dimensions.get("window").height * 0.35,
    position: "relative",
  },
  headerGradient: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 10,
  },
  companyBadge: {
    backgroundColor: "#ECF0F1",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  companyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E50",
  },
  aboutSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ECF0F1",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ECF0F1",
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#7F8C8D",
    fontWeight: "400",
  },
  contactSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ECF0F1",
  },
  contactIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ECF0F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contactText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2C3E50",
    flex: 1,
  },
  socialSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ECF0F1",
  },
  socialMediaGrid: {
    marginTop: 10,
  },
  socialGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  itemContainer: {
    margin: 6,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9F9",
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nfcSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveContactSection: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 40,
  },
  saveContactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C3E50",
    paddingVertical: 14,
    borderRadius: 8,
  },
  saveContactText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});


