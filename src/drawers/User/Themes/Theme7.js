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
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";

const Theme7 = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { userId, handleClickVibration } = useAuth();
  const [seeUser, setSeeUser] = useState(null);
  const [social, setSocial] = useState({});
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    fetchSocialData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [fetchData, fetchSocialData]);

  const handlePhonePress = () => {
    handleClickVibration();
    const phoneNumber = seeUser?.user?.phone || seeUser?.company?.phone || "";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    handleClickVibration();
    const email = seeUser?.user?.email || seeUser?.company?.email || "";
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsitePress = () => {
    handleClickVibration();
    const website = seeUser?.company?.website || seeUser?.socialize?.website || "https://www.google.com";
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

  const handleShareProfile = async () => {
    handleClickVibration();
    try {
      const userData = `https://bc.exploreanddo.com/get-web-nfc-user/${userId}`;
      const qrData = JSON.stringify(userData);
      navigation.navigate("Share Profile", { qrData });
    } catch (error) {
      console.error("Error sharing:", error);
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

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header Card */}
      <View style={styles.profileCard}>
        {/* Company Logo */}
        <View style={styles.logoContainer}>
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
        </View>

        {/* Profile Image */}
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
        <Text style={styles.nameText}>
          {seeUser?.user?.user_details?.businessname ||
            `${seeUser?.user?.firstname || "Mohammad"} ${seeUser?.user?.lastname || "Nadeem"}`}
        </Text>
        <Text style={styles.titleText}>
          {seeUser?.user?.user_details?.title || "Assistant Director"}
        </Text>
        <Text style={styles.companyText}>
          {seeUser?.company?.companyname || 
           seeUser?.user?.user_details?.company_name || 
           "Spectrum Telecom"}
        </Text>
      </View>

      {/* About Me Section */}
      <View style={styles.aboutCard}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          {seeUser?.user?.user_details?.headline || 
           "Professional with expertise in telecommunications and business development. Passionate about connecting people and driving innovation in digital solutions."}
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactCard}>
        <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
          <MaterialIcons name="phone" size={20} color="#666" />
          <Text style={styles.contactText}>
            {seeUser?.user?.phone || seeUser?.company?.phone || "0265536900"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
          <MaterialIcons name="email" size={20} color="#666" />
          <Text style={styles.contactText}>
            {seeUser?.user?.email || seeUser?.company?.email || "alan@gmail.com"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
          <MaterialCommunityIcons name="web" size={20} color="#666" />
          <Text style={styles.contactText}>
            {seeUser?.company?.website || seeUser?.socialize?.website || "https://exploreanddo.id"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleLocationPress}>
          <MaterialIcons name="location-on" size={20} color="#666" />
          <Text style={styles.contactText}>
            {seeUser?.user?.user_details?.address || "Hyderabad"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Grid */}
      <View style={styles.socialCard}>
        <View style={styles.socialGrid}>
          {socialKeys
            .filter((type) => {
              const value = social[type];
              return value !== "null" && value !== null && value !== "";
            })
            .slice(0, 12)
            .map((type) => {
              const imageSource = imageSources[type];
              return (
                <TouchableOpacity 
                  key={type} 
                  style={styles.socialIconContainer}
                  onPress={() => handleSocialMediaPress(type)}
                >
                  <Image source={imageSource} style={styles.socialIcon} />
                </TouchableOpacity>
              );
            })}
          
          {/* Add placeholder social icons if no social data */}
          {(!social || Object.keys(social).length === 0) && (
            <>
              <TouchableOpacity style={styles.socialIconContainer}>
                <Image source={require("../../../../assets/social/whatsapp.gif")} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIconContainer}>
                <Image source={require("../../../../assets/social/instagram.gif")} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIconContainer}>
                <Image source={require("../../../../assets/social/twitter.gif")} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIconContainer}>
                <Image source={require("../../../../assets/social/facebook.gif")} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIconContainer}>
                <Image source={require("../../../../assets/social/linkedin.gif")} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIconContainer}>
                <Image source={require("../../../../assets/social/youtube.gif")} style={styles.socialIcon} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            handleClickVibration();
            Toast.show({
              type: "info",
              text1: "NFC Write",
              text2: "NFC functionality coming soon",
              position: "top",
              visibilityTime: 3000,
            });
          }}
        >
          <MaterialCommunityIcons name="cellphone-nfc" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShareProfile}
        >
          <MaterialIcons name="share" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Save Contact Button */}
      <TouchableOpacity style={styles.saveContactButton}>
        <Text style={styles.saveContactText}>Save Contact</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Theme7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  companyLogo: {
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  profileImageContainer: {
    marginTop: 30,
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#F0F0F0",
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  companyText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#888",
    textAlign: "center",
  },
  aboutCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
    fontWeight: "400",
  },
  contactCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  contactText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#333",
    marginLeft: 15,
    flex: 1,
  },
  socialCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  socialIconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 5,
  },
  socialIcon: {
    width: 35,
    height: 35,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
    paddingHorizontal: 40,
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveContactButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveContactText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});