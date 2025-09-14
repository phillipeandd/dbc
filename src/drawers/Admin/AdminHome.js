import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import AdminFooter from "../../screens/Footer/AdminFooter";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { Modal } from "react-native";
import { Table, Row } from "react-native-table-component";
import { StatusBar } from "expo-status-bar";
const AdminHome = ({ navigation }) => {
  const { userId } = useAuth();
  const { width, height } = Dimensions.get("window");

  const [nfcUser, setNfcUser] = useState("");
  //console.log("nfcUser", nfcUser);
  const fetchNfcUserData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/company-nfc-users/${userId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/company-nfc-users/2`;
    axios
      .get(apiUrl)
      .then((response) => {
        setNfcUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  useEffect(() => {
    fetchNfcUserData();
  }, [fetchNfcUserData]);

  const [branchesCount, setBranchesCount] = useState("");
  //console.log("branchesCount", branchesCount);
  const [isLoading, setIsLoading] = useState(false);
  const fetchBranchesCount = useCallback(() => {
    setIsLoading(true);
    const apiUrl = `https://bc.exploreanddo.com/api/company-branches/${userId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setBranchesCount(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetchBranchesCount();
  }, [fetchBranchesCount]);

  const [showQRCode, setShowQRCode] = useState(false);

  const [userVisibility, setUserVisibility] = useState({});

  const handleUserPressOpen = (userId) => {
    setUserVisibility((prevVisibility) => ({
      ...prevVisibility,
      [userId]: !prevVisibility[userId],
    }));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNfcUserData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const openPopover = () => {
    setIsPopoverVisible(true);
  };

  const closePopover = () => {
    setIsPopoverVisible(false);
  };



  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity>
            <LinearGradient
              colors={["#8339FF", "#702DFF"]}
              start={[1, 0]}
              end={[0, 1]}
              style={styles.button}
            >
              <Text style={styles.titleBox}>Availed License</Text>
              <Text style={styles.titleBox}>49/100</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
          
          // onPress={openPopover}
          onPress={() =>
            navigation.navigate("Branches", {
            })
          }
          >
            <LinearGradient
              colors={["#8339FF", "#702DFF"]}
              start={[1, 0]}
              end={[0, 1]}
              style={styles.button}
            >
              <Text style={styles.titleBox}>No Of Branches</Text>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.titleBox}>
                  {branchesCount ? branchesCount.branches.length : ""}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <Modal
            visible={isPopoverVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closePopover}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "flex-end",

                  // backgroundColor: "white",
                }}
                onPress={closePopover}
              >
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 20,
                  maxHeight: 400,
                  width: 300,
                }}
              >
                <ScrollView>
                  {branchesCount &&
                    branchesCount.branches.map((branch, index) => (
                      <View key={index}>
                        <View
                          style={[
                            styles.branchContainer,
                            index % 2 === 0
                              ? styles.skyBackground
                              : styles.oliveBackground,
                          ]}
                        >
                          <Text
                            style={{ fontWeight: "bold", color: "#8339FF" }}
                          >
                            Branch Name: {branch.branch_name}
                          </Text>
                          <Text>Email: {branch.email}</Text>
                          <Text>Address: {branch.address}</Text>
                          <Text>Phone: {branch.phone}</Text>
                        </View>
                        {index !== branchesCount.branches.length - 1 && (
                          <View style={styles.separator} />
                        )}
                      </View>
                    ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
          {Platform.OS === "android" && (
            <StatusBar backgroundColor="#702DFF" barStyle="light-content" />
          )}
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{marginBottom:50}}
        >
          {nfcUser?.data?.map((user) => (
            <TouchableOpacity
              onPress={() => handleUserPressOpen(user.nfc_users.id)}
              key={user.nfc_users.id}
            >
              <View style={styles.userContainer}>
                <View style={styles.leftContainer}>
                  <TouchableOpacity style={styles.iconContainer}>
                    <Octicons name="dot-fill" size={24} color="#8339FF" />
                  </TouchableOpacity>
                  <View style={styles.verticalLine}></View>
                </View>
                <LinearGradient
                  colors={["#EDDFFF", "#EDCDFF"]}
                  start={[1, 0]}
                  end={[0, 1]}
                  style={styles.rightContainer}
                >
                {user && user?.nfc_users?.users?.userImage ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Emp Details", {
                        nfcUserDetails: user,
                        companyDetails: nfcUser.company,
                      })
                    }
                  >
                    <View style={{ position: "relative" }}>
                      <Image
                        source={
                          user && user?.nfc_users?.users?.userImage
                            ? {
                                uri: `https://bc.exploreanddo.com/${user?.nfc_users?.users?.userImage}`,
                              }
                            : require("../../../assets/user.jpg")
                        }
                        style={styles.image}
                      />
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: -10,
                          right: 5,
                          backgroundColor: "transparent",
                        }}
                        onPress={() =>
                          navigation.navigate("Emp Details", {
                            nfcUserDetails: user,
                            companyDetails: nfcUser.company,
                          })
                        }
                      >
                        <MaterialCommunityIcons
                          name="account-edit"
                          size={24}
                          color="#8339FF"
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Emp Details", {
                        nfcUserDetails: user,
                        companyDetails: nfcUser.company,
                      })
                    }
                  >
                    <Image
                      source={require("../../../assets/user.jpg")}
                      style={styles.image}
                      //resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}

                  <View style={styles.textContainer}>
                    <Text style={styles.title}>
                      {user.nfc_users.users.firstname
                        ? user.nfc_users.users.firstname
                        : ""}{" "}
                      {user.nfc_users.users.lastname
                        ? user.nfc_users.users.lastname
                        : ""}
                    </Text>
                    <Text style={styles.subtitle}>
                      {user.nfc_users.branch?.branch_name
                        ? user.nfc_users.branch?.branch_name
                        : ""}
                    </Text>
                    <Text style={styles.subtitle}>
                      Serial No :-{" "}
                      {user.nfc_users.serial_no ? user.nfc_users.serial_no : ""}
                    </Text>

                    {userVisibility[user.nfc_users.id] && (
                      <View>
                        <Text style={[styles.title, { marginTop: 5 }]}>
                          {nfcUser?.company?.companyname
                            ? nfcUser?.company?.companyname
                            : ""}
                        </Text>
                        <View style={styles.imageContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Emp Details", {
                                nfcUserDetails: user,
                                companyDetails: nfcUser.company,
                              })
                            }
                          >
                            <Image
                              source={require("../../../assets/qr.png")}
                              style={styles.image}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                  <MaterialCommunityIcons
                    name={
                      userVisibility[user.nfc_users.id]
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={30}
                    color="#8339FF"
                    onPress={() => handleUserPressOpen(user.nfc_users.id)}
                  />
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <AdminFooter navigation={navigation} />
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#eee",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  titleBox: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#702DFF",
  },

  button: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonBorder: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#702DFF",
    borderWidth: 1,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  leftContainer: {
    width: "8%",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  iconContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  verticalLine: {
    height: 50,
    width: 2,
    backgroundColor: "#8339FF",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    //flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 14,
    color: "#8339FF",
  },

  branchContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  skyBackground: {
    backgroundColor: "#EDDFFF",
  },
  oliveBackground: {
    backgroundColor: "#EDCDFF",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderStyle: "dashed",
    marginHorizontal: 10,
    margin: 10,
  },
});
