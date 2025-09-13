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
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import NfcComponent from "../../../components/NfcComponent";

const Theme8 = ({ navigation }) => {
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

  const renderSocialItem = ({ item }) => {
    const { type, value } = item;
    if (!value || value === "null" || value === "") {
      return null;
    }
    const imageSource = imageSources[type];
    return (
      <TouchableOpacity style={styles.socialItemContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialMediaPress(type)}
        >
          <Image source={imageSource} style={styles.socialIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header with curved background */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={["#E8F6FF", "#FFFFFF"]}
            style={styles.headerBackground}
            start={[0, 0]}
            end={[0, 1]}
          >
            {/* Profile Image */}
            <View style={styles.profileSection}>
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

            {/* Name Section */}
            <View style={styles.nameSection}>
              <Text style={styles.nameText}>
                {seeUser?.user?.firstname} {seeUser?.user?.lastname}
              </Text>
              <Text style={styles.titleText}>
                {seeUser?.user?.user_details?.title || "Professional"}
              </Text>
              
              {/* Company Badge */}
              <View style={styles.companyContainer}>
                {seeUser && seeUser?.company?.logo ? (
                  <Image
                    source={{
                      uri: `https://bc.exploreanddo.com/${seeUser.company.logo}`,
                    }}
                    style={styles.companyLogo}
                  />
                ) : (
                  <Image
                    source={require("../../../../assets/social/speclogo.png")}
                    style={styles.companyLogo}
                  />
                )}
                <Text style={styles.companyName}>
                  {seeUser?.company?.companyname || seeUser?.user?.user_details?.company_name}
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Curved bottom design */}
          <View style={styles.curvedBottom}>
            <LinearGradient
              colors={["#27AE60", "#2ECC71"]}
              style={styles.curvedGradient}
              start={[0, 0]}
              end={[1, 0]}
            />
          </View>
        </View>

        {/* About Me Section */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About Me</Text>
          <Text style={styles.aboutDescription}>
            {seeUser?.user?.user_details?.headline || 
             `Experienced ${seeUser?.user?.user_details?.title || "professional"} dedicated to excellence and innovation.`}
          </Text>
        </View>

        {/* Contact Information Cards */}
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactCard} onPress={handleEmailPress}>
            <View style={styles.contactIconWrapper}>
              <MaterialIcons name="email" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>
              {seeUser?.user?.email || ""}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handlePhonePress}>
            <View style={styles.contactIconWrapper}>
              <MaterialIcons name="phone" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>
              {seeUser?.user?.phone || ""}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleWebsitePress}>
            <View style={styles.contactIconWrapper}>
              <MaterialCommunityIcons name="web" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.contactLabel}>Website</Text>
            <Text style={styles.contactValue} numberOfLines={1}>
              {seeUser?.company?.website || ""}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleLocationPress}>
            <View style={styles.contactIconWrapper}>
              <MaterialIcons name="location-on" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.contactLabel}>Location</Text>
            <Text style={styles.contactValue} numberOfLines={2}>
              {seeUser?.user?.user_details?.address || ""}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Section */}
        <View style={styles.socialContainer}>
          <View style={styles.socialBackground}>
            <FlatList
              data={socialKeys
                .filter((type) => {
                  const value = social[type];
                  return value !== "null" && value !== null && value !== "";
                })
                .map((type) => ({ type, value: social[type] }))}
              renderItem={renderSocialItem}
              keyExtractor={(item) => item.type}
              numColumns={4}
              contentContainerStyle={styles.socialGrid}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* NFC Section */}
        <View style={styles.nfcSection}>
          <NfcComponent navigation={navigation} />
        </View>

        {/* Save Contact Button */}
        <View style={styles.saveSection}>
          <TouchableOpacity style={styles.saveButton}>
            <MaterialIcons name="person-add" size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  // Social media handlers (same as Theme7)
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

  const renderSocialItem = ({ item }) => {
    const { type, value } = item;
    if (!value || value === "null" || value === "") {
      return null;
    }
    const imageSource = imageSources[type];
    return (
      <TouchableOpacity style={styles.socialItemContainer}>
        <TouchableOpacity
          style={styles.socialIconButton}
          onPress={() => handleSocialMediaPress(type)}
        >
          <Image source={imageSource} style={styles.socialIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
};

export default Theme8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  headerContainer: {
    position: "relative",
    height: Dimensions.get("window").height * 0.5,
  },
  headerBackground: {
    flex: 1,
    paddingTop: 40,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  nameSection: {
    alignItems: "center",
    marginTop: 25,
    paddingHorizontal: 20,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 15,
  },
  companyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  companyLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A90E2",
  },
  curvedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    overflow: "hidden",
  },
  curvedGradient: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  aboutContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 30,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 12,
  },
  aboutDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#7F8C8D",
    fontWeight: "400",
  },
  contactContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  contactCard: {
    backgroundColor: "#34495E",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  contactIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#BDC3C7",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    marginLeft: 12,
  },
  socialContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  socialBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  socialGrid: {
    justifyContent: "center",
    alignItems: "center",
  },
  socialItemContainer: {
    margin: 10,
  },
  socialIconButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFE",
    borderWidth: 2,
    borderColor: "#E3F2FD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
  nfcSection: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  saveSection: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 40,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#27AE60",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 10,
  },
});