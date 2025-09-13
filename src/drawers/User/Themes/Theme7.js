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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Section with Profile Image */}
      <View style={styles.headerSection}>
        <LinearGradient
          colors={["#E8F4FD", "#FFFFFF"]}
          style={styles.headerGradient}
          start={[0, 0]}
          end={[0, 1]}
        >
          <View style={styles.profileImageContainer}>
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
          
          {/* Name and Title */}
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {seeUser?.user?.firstname} {seeUser?.user?.lastname}
            </Text>
            <View style={styles.companyBadge}>
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
              <Text style={styles.companyText}>
                {seeUser?.company?.companyname || seeUser?.user?.user_details?.company_name}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* About Me Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          {seeUser?.user?.user_details?.headline || 
           `${seeUser?.user?.user_details?.title || "Professional"} at ${seeUser?.company?.companyname || seeUser?.user?.user_details?.company_name || "Company"}`}
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
          <View style={styles.contactIconContainer}>
            <MaterialIcons name="phone" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.contactText}>
            {seeUser?.user?.phone || ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
          <View style={styles.contactIconContainer}>
            <MaterialIcons name="email" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.contactText}>
            {seeUser?.user?.email || ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
          <View style={styles.contactIconContainer}>
            <MaterialCommunityIcons name="web" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.contactText}>
            {seeUser?.company?.website || ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleLocationPress}>
          <View style={styles.contactIconContainer}>
            <MaterialIcons name="location-on" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.contactText}>
            {seeUser?.user?.user_details?.address || ""}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Section */}
      <View style={styles.socialSection}>
        <View style={styles.socialMediaGrid}>
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
            contentContainerStyle={styles.socialGridContainer}
          />
        </View>
      </View>

      {/* NFC and Share Section */}
      <View style={styles.actionSection}>
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
    backgroundColor: "#F8FAFE",
  },
  headerSection: {
    height: Dimensions.get("window").height * 0.45,
    position: "relative",
  },
  headerGradient: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 12,
  },
  companyBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  companyLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  companyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
  },
  aboutSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
    fontWeight: "400",
  },
  contactSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C3E50",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contactText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    flex: 1,
  },
  socialSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  socialMediaGrid: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  socialGridContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  socialItemContainer: {
    margin: 8,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  actionSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveContactSection: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  saveContactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#27AE60",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  saveContactText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});