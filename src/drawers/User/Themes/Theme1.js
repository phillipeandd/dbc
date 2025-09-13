import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../context/AuthProvider";
import NfcComponent from "../../../components/NfcComponent";

/**
 * Theme 1 component - Classic business card layout
 * @param {Object} navigation - Navigation object for screen transitions
 */
const Theme1 = ({ navigation }) => {
  const { 
    userId, 
    handleShareProfile, 
    handleClickVibration, 
    seeUser, 
    setSeeUser 
  } = useAuth();
  
  /**
   * Fetch user company details
   */
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
  
  /**
   * Fetch social media links for the user
   */
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

  /**
   * Handle phone number press - opens phone dialer
   */
  const handlePhonePress = () => {
    const phoneNumber = `${seeUser?.phone ? seeUser?.phone : ""}`;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  /**
   * Handle email press - opens email client
   */
  const handleEmailPress = () => {
    const email = `${seeUser?.email ? seeUser?.email : ""}`;
    Linking.openURL(`mailto:${email}`);
  };

  /**
   * Handle website press - opens browser
   */
  const handleWebsitePress = () => {
    const website = `${
      seeUser?.company?.website
        ? seeUser?.company?.website
        : "http://www.google.com"
    }`;
    Linking.openURL(website);
  };

  /**
   * Handle WhatsApp press with error handling
   */
  const handleWhatsAppPress = () => {
    handleClickVibration();
    const phoneNumber = social?.whatsapp;
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Please Install WhatsApp`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  /**
   * Handle Instagram press with error handling
   */
  const handleInstagramPress = () => {
    handleClickVibration();
    const userName = social?.instagram;
    Linking.openURL(`instagram://user?username=${userName}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Please Install Instagram`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };
  
  /**
   * Handle Twitter press with error handling
   */
  const handleTwitterPress = () => {
    handleClickVibration();
    const userName = social?.twitter;
    Linking.openURL(`twitter://user?screen_name=${userName}`).catch(() => {
      Toast.show({
        type: "error",
        text1: `Please Install Twitter`,
        position: "top",
        visibilityTime: 4000,
      });
    });
  };

  /**
   * Handle Facebook press with fallback to browser
   */
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

  /**
   * Open Facebook profile in browser as fallback
   * @param {string} email - Email to search for on Facebook
   */
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

  /**
   * Grid item component for contact information
   * @param {string} icon - Material icon name
   * @param {string} label - Display label
   * @param {string} description - Contact information
   */
  const GridItem = ({ icon, label, description }) => {
    return (
      <TouchableOpacity style={styles.gridItem} >
        <MaterialIcons name={icon} size={30} color="black" />
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <ScrollView>
      <View
        style={[
          {
            elevation: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            paddingHorizontal: Dimensions.get("window").width * 0.05,
            paddingVertical: Dimensions.get("window").height * 0.01,
            marginVertical: Dimensions.get("window").height * 0.09,
            marginHorizontal: Dimensions.get("window").height * 0.02,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            margin: 5,
          }}
        >
          {seeUser && seeUser?.company?.logo ? (
            <Image
              source={{
                uri: `https://bc.exploreanddo.com/${seeUser.company.logo}`,
              }}
              style={{ width: 80, height: 80, borderRadius: 20 }}
            />
          ) : (
            <Image
              source={require("../../../../assets/social/speclogo.png")}
              style={{ width: 80, height: 80, borderRadius: 20 }}
            />
          )}
          <View>
            <Text
              style={[
                styles.imageText,
                {
                  fontSize: 24,
                  color: "#2B2261",
                  maxWidth: 200,
                  flexWrap: "wrap",
                },
              ]}
            >
              {seeUser?.company?.companyname
                ? seeUser?.company?.companyname
                : seeUser?.user?.user_details?.company_name}
            </Text>
            <Text
              style={[styles.imageText, { fontSize: 18, color: "#DC4F20" }]}
            >
              {seeUser?.company?.companyname
                ? seeUser?.company?.companyname
                : seeUser?.user?.user_details?.company_name}
            </Text>
          </View>
        </View>
        
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginVertical: 10,
          }}
        />
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 10,
          }}
        >
          {seeUser && seeUser?.user?.userImage ? (
            <Image
              source={{
                uri: `https://bc.exploreanddo.com/${seeUser.user.userImage}`,
              }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 5,
                borderColor: "#F78380",
              }}
              //resizeMode="contain"
          ) : (
            <Image
              source={require("../../../../assets/user.jpg")}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 5,
                borderColor: "#F78380",
              }}
              //resizeMode="contain"
          )}
          <View style={{ marginTop: "10%" }}>
            <Text
              style={[
                styles.imageText,
                { fontSize: 30, color: "black", fontWeight: "400" },
              ]}
            >
              {seeUser?.user?.user_details?.businessname
                ? seeUser?.user?.user_details?.businessname
                : seeUser?.user?.firstname + " " + seeUser?.user?.lastname}
            </Text>
            <Text
              style={[
                styles.imageText,
                { fontSize: 18, color: "black", fontWeight: "400" },
              ]}
            >
              {seeUser?.user?.user_details?.title
                ? seeUser?.user?.user_details?.title
                : "Employee"}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <GridItem
            icon="phone-iphone"
            label="Mobile Number"
            description={
              seeUser?.company?.phone
                ? seeUser?.company?.phone
                : seeUser?.user?.phone
            }
            //onPress={handlePhonePress}
          <View style={styles.plusLine} />
          <GridItem
            icon="mail"
            label="Email Address"
            description={
              seeUser?.company?.email
                ? seeUser?.company?.email
                : seeUser?.user?.email
            }
            //onPress={handleEmailPress}
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <GridItem
            icon="web"
            label="Website"
            description={
              seeUser?.company?.website ? seeUser?.company?.website : ""
            }
            //onPress={handleWebsitePress}

          <View style={styles.plusLine} />
          <GridItem
            icon="location-on"
            label="Location"
            description={
              seeUser?.company?.address
                ? seeUser?.company?.address
                : seeUser?.user?.user_details?.address
            }
          />
        </View>
        
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={[
              {
                backgroundColor: "#F78380",
                paddingHorizontal: Dimensions.get("window").width * 0.05,
              },
            ]}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              CONNECT WITH ME
            </Text>
          </TouchableOpacity>
        </View>
        
        <View
          style={[
            styles.rowSocial,
            {
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
              paddingVertical: Dimensions.get("window").height * 0.01,
              gap: 10,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleWhatsAppPress}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require("../../../../assets/social/icons8-whatsapp-48.png")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleInstagramPress}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require("../../../../assets/social/icons8-instagram-48.png")}
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleTwitterPress}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require("../../../../assets/social/icons8-twitter-48.png")}
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleFacebookPress}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require("../../../../assets/social/icons8-facebook-48.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
        
        <NfcComponent navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default Theme1;

const styles = StyleSheet.create({
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
  gridItem: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    marginTop: 15,
  },
  label: {
    color: "#F78380",
    marginTop: 10,
  },
  description: {
    color: "black",
    marginTop: 5,
  },
  plusLine: {
    width: 1,
    backgroundColor: "#F78380",
    marginHorizontal: 30,
    height: 160,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#F78380",
  },