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
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../context/AuthProvider";
import NfcComponent from "../../../components/NfcComponent";
import NfcAdmin from "../../../components/NfcAdmin";
import { useRoute } from "@react-navigation/native";
const ATheme5 = ({ navigation }) => {
  const [seeUser, setSeeUser] = useState("");
  //console.log("buisnessdetails", seeUser);
  const route = useRoute();
  const empId = route.params.empId;
  const { userId,  handleShareProfile,handleClickVibration } = useAuth();
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
    handleClickVibration();
    const phoneNumber = `${seeUser?.data?.user?.phone ? seeUser?.data?.user?.phone : ""}`;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    handleClickVibration();
    const email = `${seeUser?.data?.user?.email ? seeUser?.data?.user?.email : ""}`;
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsitePress = () => {
    handleClickVibration();
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
            marginTop: Dimensions.get("window").height * 0.09,
            marginHorizontal: Dimensions.get("window").height * 0.02,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
            marginBottom: "20%",
          },
        ]}
      >
        <View
          style={[
            {
              elevation: 1,
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
              paddingTop: Dimensions.get("window").height * 0.02,
              paddingBottom: Dimensions.get("window").height * 0.05,
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            },
          ]}
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
                style={{width: 80, height: 80, borderRadius:20 }}
              />
            )}
          <View style={{ marginTop: "1%" }}>
            <Text
              style={[styles.imageText, { fontSize: 24, color: "#2B2261" }]}
            >
               {seeUser?.data?.user?.user_details?.company_name
                ? seeUser?.data?.user?.user_details?.company_name
                : ""}
            </Text>
            <Text
              style={[styles.imageText, { fontSize: 18, color: "#DC4F20" }]}
            >
               {seeUser?.data?.user?.user_details?.title
                ? seeUser?.data?.user?.user_details?.title
                : "Employee"}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          
          {seeUser && seeUser?.data?.user?.userImage ? (
            <Image
              source={{
                uri: `https://bc.exploreanddo.com/${seeUser.data.user.userImage}`,
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                borderWidth: 5,
                borderColor: "#8339FF",
                marginTop: "-15%",
              }}
              //resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../../../assets/user.jpg")}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                borderWidth: 5,
                borderColor: "#8339FF",
                marginTop: "-15%",
              }}
              //resizeMode="contain"
            />
          )}
        </View>
        <View
          style={{
            marginTop: "2%",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.imageText,
              { fontSize: 30, color: "black", fontWeight: "400" },
            ]}
          >
         {seeUser?.data?.user?.user_details?.businessname
                ? seeUser?.data?.user?.user_details?.businessname
                : `${seeUser?.data?.user?.firstname} ${seeUser?.data?.user?.lastname}`}
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

        <View
          style={{
            paddingVertical: Dimensions.get("window").height * 0.02,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {textChunks.map((chunk, index) => (
            <Text
              Text
              key={index}
              style={[styles.imageText, { textAlign: "center" }]}
            >
              {chunk}
            </Text>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 10,
                marginVertical: 5,
                marginTop: "5%",
              }}
            >
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handlePhonePress}
              >
                <MaterialIcons name="phone" size={30} color={"white"} />
              </TouchableOpacity>
              <View style={{}}>
                <Text style={[{ color: "#8339FF", fontWeight: "bold" }]}>
                  Phone
                </Text>
                <Text
                  style={[{ color: "black", fontWeight: "400", fontSize: 18 }]}
                >
                {
              seeUser?.data?.user?.phone ? seeUser?.data?.user?.phone : ""
            }
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 10,
                marginVertical: 5,
              }}
            >
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handleEmailPress}
              >
                <MaterialIcons name="mail" size={30} color={"white"} />
              </TouchableOpacity>
              <View style={{}}>
                <Text style={[{ color: "#8339FF", fontWeight: "bold" }]}>
                  Work Email
                </Text>
                <Text
                  style={[{ color: "black", fontWeight: "400", fontSize: 18 }]}
                >
              {
              seeUser?.data?.user?.email ? seeUser?.data?.user?.email : ""
            }
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 10,
                marginVertical: 5,
                marginBottom: "15%",
              }}
            >
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handleWebsitePress}
              >
                <MaterialCommunityIcons name="web" size={30} color={"white"} />
              </TouchableOpacity>
              <View style={{}}>
                <Text style={[{ color: "#8339FF", fontWeight: "bold" }]}>
                  Website
                </Text>
                <Text
                  style={[{ color: "black", fontWeight: "400", fontSize: 18 }]}
                >
                  {seeUser?.company?.website ? seeUser?.company?.website : ""}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.rowSocial]}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleWhatsAppPress}
            >
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={25}
                  color={"white"}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleInstagramPress}
            >
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons
                  name="instagram"
                  size={25}
                  color={"white"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleTwitterPress}
            >
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons
                  name="twitter"
                  size={25}
                  color={"white"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleFacebookPress}
            >
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons
                  name="facebook"
                  size={25}
                  color={"white"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: "5%",
          }}
        >
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
        <NfcAdmin navigation={navigation} empId={empId}/>
      </View>
    </ScrollView>
  );
};

export default ATheme5;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  gradientBackground: {
    flex: 1,
  },

  buttonContainer: {
    alignItems: "center",
  },
  buttonContent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "black",
  },
  button: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    fontWeight: "bold",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#8339FF",
  },
});
