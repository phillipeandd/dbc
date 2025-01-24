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
import NfcAdmin from "../../../components/NfcAdmin";
import { useRoute } from "@react-navigation/native";
const ATheme1 = ({ navigation }) => {
  const [seeUser, setSeeUser] = useState("");
  //console.log("buisnessdetails", seeUser);
  const route = useRoute();
  const empId = route.params.empId;
  const { userId,  handleClickVibration } = useAuth();
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

  const handleShareProfile = async () => {
    handleClickVibration();
    try {
      const message = `Hello, connect with me here! on this link https://bc.exploreanddo.com/get-web-nfc-user/${empId}`;
      await Share.share({
        message: message,
        title: "Share Profile",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };


  const [social, setSocial] = useState("");
  //console.log("social", social);
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
    // const intervalId = setInterval(() => {
    //   fetchSocialData();
    // }, 5000);
    // return () => clearInterval(intervalId);
  }, [fetchSocialData]);

  const text = `${
    seeUser?.data?.user?.user_details?.headline
      ? seeUser?.data?.user?.user_details?.headline
      : ""
  }`;

  const handlePhonePress = () => {
    const phoneNumber = `${seeUser?.data?.user?.phone ? seeUser?.data?.user?.phone : ""}`;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    const email = `${seeUser?.data?.user?.email ? seeUser?.data?.user?.email : ""}`;
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsitePress = () => {
    // const website = `${
    //   seeUser?.company?.website ? seeUser?.company?.website : ""
    // }`;
    const website = "http://www.google.com";
    Linking.openURL(website);
  };
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

  const GridItem = ({ icon, label, description }) => {
    return (
      <TouchableOpacity style={styles.gridItem}>
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
              style={{width: 80, height: 80, borderRadius:20 }}
              //resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../../../assets/social/speclogo.png")}
              style={{ width: 80, height: 80, borderRadius:20 }}
            />
          )}
          <View>
            <Text
              style={[styles.imageText, { fontSize: 24, color: "#8339FF",maxWidth: 200, flexWrap: "wrap" }]}
            >
              {seeUser?.data?.user?.user_details?.company_name
                ? seeUser?.data?.user?.user_details?.company_name
                : "Employee"}
            </Text>
            <Text
              style={[styles.imageText, { fontSize: 18, color: "#8339FF" }]}
            >
              {seeUser?.data?.user?.user_details?.title
                ? seeUser?.data?.user?.user_details?.title
                : "Employee"}
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
          {seeUser && seeUser?.data?.user?.userImage ? (
            <Image
              source={{
                uri: `https://bc.exploreanddo.com/${seeUser.data.user.userImage}`,
              }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 5,
                borderColor: "#8339FF",
              }}
              //resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../../../assets/user.jpg")}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 5,
                borderColor: "#8339FF",
              }}
              //resizeMode="contain"
            />
          )}
          <View style={{ marginTop: "10%" }}>
            <Text
              style={[
                styles.imageText,
                { fontSize: 30, color: "black", fontWeight: "400" },
              ]}
            >
              {seeUser?.data?.user?.firstname
                ? seeUser?.data?.user?.firstname + " " + seeUser?.data?.user?.lastname
                : seeUser?.data?.user?.firstname + " " + seeUser?.data?.user?.lastname}
            </Text>
            <Text
              style={[
                styles.imageText,
                { fontSize: 18, color: "black", fontWeight: "400" },
              ]}
            >
              {seeUser?.data?.user?.user_details?.title
                ? seeUser?.data?.user?.user_details?.title
                : "Employee"}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <GridItem
            icon="phone-iphone"
            label="Mobile Number"
            description={
              seeUser?.data?.user?.phone ? seeUser?.data?.user?.phone : ""
            }
          />
          <View style={styles.plusLine} />
          <GridItem
            icon="mail"
            label="Email Address"
            description={
              seeUser?.data?.user?.email ? seeUser?.data?.user?.email : ""
            }
          />
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <GridItem
            icon="web"
            label="Website"
            description={
              seeUser?.company?.website ? seeUser?.company?.website : "www.google.com"
            }
          />
          <View style={styles.plusLine} />
          <GridItem
            icon="location-on"
            label="Location"
            description={
              seeUser?.data?.user?.user_details?.address
                ? seeUser?.data?.user?.user_details?.address
                : ""
            }
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
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
        </View>
        <View
          style={[
            styles.rowSocial,
            {
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
              // paddingHorizontal: Dimensions.get("window").width * 0.05,
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
          {/* <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.buttonContent}>
              <Image
                source={require("../../../../assets/social/icons8-pinterest-48.png")}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.buttonContent}>
              <Image
                source={require("../../../../assets/social/icons8-tiktok-48.png")}
              />
            </View>
          </TouchableOpacity> */}
        </View>
        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "#8339FF",
                width: Dimensions.get("window").width * 0.4,
              },
            ]}
            onPress={handleShareProfile}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              <FontAwesome name="send-o" size={15} color={"white"} /> Share
            </Text>
          </TouchableOpacity>
        </View> */}
        <NfcAdmin navigation={navigation} empId={empId} />
      </View>
    </ScrollView>
  );
};

export default ATheme1;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  gradientBackground: {
    flex: 1,
  },

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
  button: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
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
    color: "#8339FF",
    marginTop: 10,
  },
  description: {
    color: "black",
    marginTop: 5,
  },
  plusLine: {
    width: 1,
    backgroundColor: "#8339FF",
    marginHorizontal: 30,
    height: 160,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#8339FF",
  },
});
