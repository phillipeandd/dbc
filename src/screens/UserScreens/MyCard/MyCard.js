import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import Footer from "../../Footer/Footer";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthProvider";
import axios from "axios";
import QRCode from "react-native-qrcode-svg";
// import NfcManager, { NfcTech } from "react-native-nfc-manager";
import Toast from "react-native-toast-message";
const MyCard = ({ navigation }) => {
  const { userId, handleClickVibration } = useAuth();
  const { width, height } = Dimensions.get("window");
  const [seeUser, setSeeUser] = useState("");
  const [social, setSocial] = useState("");
  //console.log("phoneNumber",social.whatsapp)
  //console.log("buisnessdetails", seeUser);
  const fetchData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/${userId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSeeUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 3000);
    // return () => clearInterval(intervalId);
  }, [fetchData]);

  const fetchSocialData = useCallback(() => {
    //const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/${userId}`;
    const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSocial(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchSocialData();
  }, [fetchSocialData]);

  const GridItem = ({ icon, label, description }) => {
    return (
      <TouchableOpacity style={styles.gridItem}>
        <MaterialIcons name={icon} size={30} color="black" />
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    );
  };

  const ImageWithText = () => {
    return (
      <View style={styles.imageContainer}>
       {seeUser && seeUser?.user?.userImage ? (
          <Image
            source={{ uri: `https://bc.exploreanddo.com/${seeUser.user.userImage}` }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../../../../assets/user.jpg")}
            style={styles.image}
            resizeMode="contain"
          />
        )}

        <Text style={[styles.imageText,{marginTop:"-8%"}]}>
        {seeUser?.user?.user_details?.businessname
                ? seeUser?.user?.user_details?.businessname
                : seeUser?.user?.firstname + " " + seeUser?.user?.lastname}
        </Text>
        <Text style={[styles.imageText, { fontSize: 14, color: "black" }]}>
        {seeUser?.user?.user_details?.title
                ? seeUser?.user?.user_details?.title
                : "Employee"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 50,
            margin: 5,
          }}
        >
          {seeUser && seeUser?.company?.logo ? (
            <Image
              source={{
                uri: `https://bc.exploreanddo.com/${seeUser.company.logo}`,
              }}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../../../assets/social/speclogo.png")}
              style={{ width: 35, height: 35 }}
            />
          )}

          <View>
            <Text style={[styles.imageText, { fontSize: 12, color: "blue" }]}>
            {seeUser?.company?.companyname ?seeUser?.company?.companyname : seeUser?.user?.user_details?.company_name}
            </Text>
            <Text style={[styles.imageText, { fontSize: 8, color: "#DC4F20" }]}>
            {seeUser?.company?.companyname ?seeUser?.company?.companyname : seeUser?.user?.user_details?.company_name}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [userData, setUserData] = useState(
    `https://bc.exploreanddo.com/api/get-company-details/${userId}`
  );
  const handleShare = () => {
    handleClickVibration();
    // Generate QR code data based on user data
    const qrData = JSON.stringify(userData);
    // Navigate to Share Profile screen
    navigation.navigate("Share Profile", { qrData });
  };

  // const handleWriteToNFC = async () => {
  //   handleClickVibration();
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     const uri = "https://example.com";
  //     const bytes = NfcManager.stringToBytes(uri);
  //     await NfcManager.ndefHandler.writeNdefMessage(bytes);
  //     console.log("Successfully wrote to NFC tag");
  //   } catch (error) {
  //     console.error("Error writing to NFC tag:", error);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // };

  // const handleReadFromNFC = async () => {
  //   handleClickVibration();
  //   try {
  //     // Request NFC session
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  
  //     // Read data from NFC tag
  //     const tag = await NfcManager.getTag();
  //     if (tag) {
  //       if (tag.ndefMessage) {
  //         const uri = NfcManager.bytesToString(tag.ndefMessage[0].payload);
  //         // Open the link in a browser
  //         Linking.openURL(uri);
  //       } else {
  //         console.log("NFC tag does not contain NDEF message");
  //       }
  //     } else {
  //       console.log("No NFC tag detected");
  //     }
  //   } catch (error) {
  //     console.error("Error reading from NFC tag:", error);
  //   } finally {
  //     // Close NFC session
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // };

  

  const handleWhatsAppPress = () => {
    handleClickVibration();
    const phoneNumber = social?.whatsapp;
    // console.log("phoneNumber11",phoneNumber)
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

  return (
    <LinearGradient
      colors={["white", "#FCD1D1"]}
      style={styles.gradientBackground}
      start={[0, 0]}
      end={[0, 1]}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageWithText />

        <View style={styles.container}>
          <View style={styles.row}>
            <GridItem
              icon="phone-iphone"
              label="Mobile Number"
              description={seeUser?.company?.phone ? seeUser.company.phone : ""}
            />
            <View style={styles.plusLine} />
            <GridItem
              icon="mail"
              label="Email Address"
              description={seeUser?.company?.email ? seeUser.company.email : ""}
            />
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.row}>
            <GridItem
              icon="web"
              label="Website"
              description={
                seeUser?.company?.website ? seeUser.company.website : ""
              }
            />
            <View style={styles.plusLine} />
            <GridItem
              icon="location-on"
              label="Location"
              description={seeUser?.company?.address
                ? seeUser?.company?.address
                : seeUser?.user?.user_details?.address}
            />
          </View>

          <View style={styles.rowReader}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#35C7F3", width: width * 0.4 },
              ]}
              //onPress={handleWriteToNFC}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                <MaterialCommunityIcons
                  name="cellphone-nfc"
                  size={15}
                  color={"white"}
                />{" "}
                Write to NFC
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#35C7F3", width: width * 0.4 },
              ]}
              // onPress={() => navigation.navigate("Share Profile")}
              onPress={handleShare}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                <FontAwesome name="send-o" size={15} color={"white"} /> Share
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.rowSocial,
              {
                backgroundColor: "#FFFFFF",
                borderRadius: 15,
                paddingHorizontal: Dimensions.get("window").width * 0.05,
                //paddingVertical: Dimensions.get("window").height * 0.01,
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
                <Text style={styles.buttonText}>WhatsApp</Text>
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
                <Text>Instagram</Text>
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
                <Text>Twitter</Text>
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
                <Text>Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

export default MyCard;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 200,
  },
  scrollView: {
    flexGrow: 1,
  },
  gradientBackground: {
    //flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#F78381",
    borderRadius: 15,
    width: "80%",
    alignSelf: "center",
    marginTop: 30,
  },
  image: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -30,
    borderWidth:1,
    borderColor:"red"
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
  buttonText: {
    //marginTop: 5,
  },
  row: {
    flexDirection: "row",
    //marginBottom: 20,
    alignItems: "center",
  },
  rowSocial: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  rowReader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 100,
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
    marginHorizontal: 10,
    height: 160,
  },
  horizontalLine: {
    width: "80%",
    height: 1,
    backgroundColor: "#F78380",
  },
  button: {
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
