import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
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
        setSocial(response.data.data || {});
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
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleEmailPress = () => {
    handleClickVibration();
    const email = seeUser?.user?.email || seeUser?.company?.email || "";
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  const handleWebsitePress = () => {
    handleClickVibration();
    const website = seeUser?.company?.website || seeUser?.socialize?.website || "";
    if (website) {
      Linking.openURL(website);
    }
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

  const handleSaveContact = () => {
    handleClickVibration();
    Toast.show({
      type: "success",
      text1: "Contact Saved",
      text2: "Contact has been saved to your device",
      position: "top",
      visibilityTime: 3000,
    });
  };

  const handleSocialMediaPress = (type) => {
    handleClickVibration();
    const value = social[type];
    if (!value || value === "null" || value === "") {
      Toast.show({
        type: "info",
        text1: "Not Available",
        text2: `${type} profile not configured`,
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    switch (type) {
      case "whatsapp":
        Linking.openURL(`whatsapp://send?phone=${value}`).catch(() => {
          Toast.show({
            type: "error",
            text1: "WhatsApp not installed",
            position: "top",
            visibilityTime: 3000,
          });
        });
        break;
      case "instagram":
        Linking.openURL(`instagram://user?username=${value}`).catch(() => {
          Toast.show({
            type: "error",
            text1: "Instagram not installed",
            position: "top",
            visibilityTime: 3000,
          });
        });
        break;
      case "twitter":
        Linking.openURL(`twitter://user?screen_name=${value}`).catch(() => {
          Toast.show({
            type: "error",
            text1: "Twitter not installed",
            position: "top",
            visibilityTime: 3000,
          });
        });
        break;
      case "facebook":
        Linking.openURL(`fb://profile/${value}`).catch(() => {
          Toast.show({
            type: "error",
            text1: "Facebook not installed",
            position: "top",
            visibilityTime: 3000,
          });
        });
        break;
      case "linkedIn":
        Linking.openURL(`linkedin://profile/${value}`).catch(() => {
          Toast.show({
            type: "error",
            text1: "LinkedIn not installed",
            position: "top",
            visibilityTime: 3000,
          });
        });
        break;
      case "youtube":
        Linking.openURL(`youtube://channel/${value}`).catch(() => {
          Toast.show({
            type: "error",
            text1: "YouTube not installed",
            position: "top",
            visibilityTime: 3000,
          });
        });
        break;
      default:
        Toast.show({
          type: "info",
          text1: "Coming Soon",
          text2: `${type} integration coming soon`,
          position: "top",
          visibilityTime: 3000,
        });
        break;
    }
  };

  // Social media icons data
  const socialIcons = [
    { type: 'whatsapp', color: '#25D366', icon: 'whatsapp' },
    { type: 'facebook', color: '#1877F2', icon: 'facebook' },
    { type: 'twitter', color: '#1DA1F2', icon: 'twitter' },
    { type: 'instagram', color: '#E4405F', icon: 'instagram' },
    { type: 'linkedIn', color: '#0A66C2', icon: 'linkedin' },
    { type: 'youtube', color: '#FF0000', icon: 'youtube' },
    { type: 'telegram', color: '#0088CC', icon: 'telegram' },
    { type: 'tiktok', color: '#000000', icon: 'music-note' },
    { type: 'behance', color: '#1769FF', icon: 'behance' },
    { type: 'discord', color: '#5865F2', icon: 'discord' },
    { type: 'skype', color: '#00AFF0', icon: 'skype' },
    { type: 'reddit', color: '#FF4500', icon: 'reddit' },
  ];

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
        {/* Company Logo Badge */}
        <View style={styles.logoBadge}>
          {seeUser && seeUser?.company?.logo ? (
            <Image
              source={{
                uri: `https://bc.exploreanddo.com/${seeUser.company.logo}`,
              }}
              style={styles.logoImage}
            />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>LOGO</Text>
            </View>
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
           "Professional with expertise in telecommunications and business development. Passionate about connecting people and driving innovation."}
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactCard}>
        <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
          <MaterialIcons name="phone" size={18} color="#666" />
          <Text style={styles.contactText}>
            {seeUser?.user?.phone || seeUser?.company?.phone || "0265536900"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
          <MaterialIcons name="email" size={18} color="#666" />
          <Text style={styles.contactText}>
            {seeUser?.user?.email || seeUser?.company?.email || "alan@gmail.com"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleWebsitePress}>
          <MaterialCommunityIcons name="web" size={18} color="#666" />
          <Text style={styles.contactText}>
            {seeUser?.company?.website || seeUser?.socialize?.website || "https://exploreanddo.id"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleLocationPress}>
          <MaterialIcons name="location-on" size={18} color="#666" />
          <Text style={styles.contactText}>
            {seeUser?.user?.user_details?.address || "Hyderabad"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Grid */}
      <View style={styles.socialCard}>
        <View style={styles.socialGrid}>
          {socialIcons.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.socialIconContainer, { backgroundColor: item.color }]}
              onPress={() => handleSocialMediaPress(item.type)}
            >
              <MaterialCommunityIcons 
                name={item.icon} 
                size={20} 
                color="white" 
              />
            </TouchableOpacity>
          ))}
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
      <TouchableOpacity style={styles.saveContactButton} onPress={handleSaveContact}>
        <Text style={styles.saveContactText}>Save Contact</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Theme7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  logoBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  logoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 8,
    fontWeight: "600",
    color: "#666",
  },
  profileImageContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#F0F0F0",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
    marginBottom: 2,
  },
  companyText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888",
    textAlign: "center",
  },
  aboutCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#666",
    fontWeight: "400",
  },
  contactCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  contactText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  socialCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  socialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 4,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  saveContactButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 14,
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
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});