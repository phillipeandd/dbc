import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DrawerActions,
  NavigationContainer,
  CommonActions,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { AuthProvider, useAuth } from "./src/context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { SafeAreaWrapper } from "./components/common";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import Icon from "react-native-vector-icons/Entypo";
import Login from "./src/screens/UserScreens/Login";
import Toast from "react-native-toast-message";
import LandingScreen from "./src/screens/LandingScreen";
import Signup from "./src/screens/UserScreens/Signup";
import Display from "./src/drawers/User/Display/Display";
import EditInfo from "./src/drawers/User/EditInfo/EditInfo";
import AddFields from "./src/drawers/User/AddFields/AddFields";
import Contacts from "./src/drawers/User/Contacts/Contacts";
import Footer from "./src/screens/Footer/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyCard from "./src/screens/UserScreens/MyCard/MyCard";
import { useCallback, useRef } from "react";
import Layout from "./src/drawers/User/Layouts/Layout";
import Firstthing from "./src/screens/UserScreens/Setup/Firstthing";
import EnterCardDetails from "./src/screens/UserScreens/Setup/EnterCardDetails";
import Theme1 from "./src/drawers/User/Themes/Theme1";
import Theme2 from "./src/drawers/User/Themes/Theme2";
import Theme3 from "./src/drawers/User/Themes/Theme3";
import Theme4 from "./src/drawers/User/Themes/Theme4";
import Theme5 from "./src/drawers/User/Themes/Theme5";
import Theme6 from "./src/drawers/User/Themes/Theme6";
import AdminLogin from "./src/screens/AdminScreens/AdminLogin";
import SelectTheme from "./src/screens/UserScreens/Setup/SelectTheme";
import AdminHome from "./src/drawers/Admin/AdminHome";
import AddUser from "./src/drawers/Admin/AddUser";
import Scanner from "./src/drawers/User/Scans/Scanner";
import ScannedCards from "./src/drawers/User/Scans/ScannedCards";
import Settings from "./src/drawers/User/Settings/Settings";
import ContactDetails from "./src/drawers/User/Contacts/ContactDetails";
import ShareProfile from "./src/drawers/User/ShareProfile/ShareProfile";
import Analytics from "./src/drawers/User/Analytics/Analytics";
import SavedScan from "./src/drawers/User/Scans/SavedScan";
import UserTheme1 from "./src/drawers/User/UserThemed/UserTheme1";
import UserTheme2 from "./src/drawers/User/UserThemed/UserTheme2";
import UserTheme3 from "./src/drawers/User/UserThemed/UserTheme3";
import UserTheme4 from "./src/drawers/User/UserThemed/UserTheme4";
import UserTheme5 from "./src/drawers/User/UserThemed/UserTheme5";
import UserTheme6 from "./src/drawers/User/UserThemed/UserTheme6";
import EmpDetails from "./src/drawers/Admin/EmpDetails";
import RootScreen from "./src/components/RootScreen";
import AdminTheme1 from "./src/drawers/Admin/AdminThemed/AdminTheme1";
import AdminTheme2 from "./src/drawers/Admin/AdminThemed/AdminTheme2";
import AdminTheme3 from "./src/drawers/Admin/AdminThemed/AdminTheme3";
import AdminTheme4 from "./src/drawers/Admin/AdminThemed/AdminTheme4";
import AdminTheme5 from "./src/drawers/Admin/AdminThemed/AdminTheme5";
import AdminTheme6 from "./src/drawers/Admin/AdminThemed/AdminTheme6";
import ATheme1 from "./src/drawers/Admin/AThemes/ATheme1";
import ATheme2 from "./src/drawers/Admin/AThemes/ATheme2";
import ATheme3 from "./src/drawers/Admin/AThemes/ATheme3";
import ATheme4 from "./src/drawers/Admin/AThemes/ATheme4";
import ATheme5 from "./src/drawers/Admin/AThemes/ATheme5";
import ATheme6 from "./src/drawers/Admin/AThemes/ATheme6";
import AdminAddFields from "./src/drawers/Admin/AdminAddFields/AdminAddFields";
import AdminEditInfo from "./src/drawers/Admin/AdminEditInfo/AdminEditInfo";
import AdminDisplay from "./src/drawers/Admin/AdminDisplay/AdminDisplay";
import AdminLayout from "./src/drawers/Admin/AdminLayout/AdminLayout";
import ForgotPassword from "./src/components/ForgotPassword";
import ContactSupport from "./src/drawers/User/Supports/ContactSupport";
import ManageSupport from "./src/drawers/User/Supports/ManageSupport";
import AppVersion from "./src/drawers/User/Supports/AppVersion";
import CheckUpdates from "./src/drawers/User/Supports/CheckUpdates";
import HelpCenter from "./src/drawers/User/Supports/HelpCenter";
import PrivacyPolicy from "./src/drawers/User/Supports/PrivacyPolicy";
import Feedback from "./src/drawers/User/Supports/Feedback";
import Theme3_0 from "./src/drawers/User/Themes/Theme3_0";
import UserTheme3_0 from "./src/drawers/User/UserThemed/UserTheme3_0";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const windowHeight = Dimensions.get("window").height;

function CustomDrawerContent(props) {
  const { navigation } = props;
  const {
    userLogout,
    companyLogout,
    roleOf,
    firstName,
    showEmail,
    showImage,
    themeIds,
    handleClickVibration,
  } = useAuth();

  let screenName;
  switch (Number(themeIds)) {
    case 1:
      screenName = "UserTheme1";
      break;
    case 2:
      screenName = "UserTheme2";
      break;
    case 3:
      screenName = "UserTheme3";
      break;
    case 4:
      screenName = "UserTheme4";
      break;
    case 5:
      screenName = "UserTheme5";
      break;
    case 6:
      screenName = "UserTheme6";
      break;
    default:
      screenName = "My Card";
  }

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 10 }}
    >
      {roleOf === "4" && (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {showImage ? (
              <Image
                source={{
                  uri: `https://bc.exploreanddo.com/${showImage}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                //resizeMode="contain"
              />
            ) : (
              <Image
                source={require("./assets/user.jpg")}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                //resizeMode="contain"
              />
            )}

            <Icon
              name="chevron-with-circle-left"
              size={35}
              color={"#702DFF"}
              onPress={() => {
                handleClickVibration();
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{ marginLeft: 16, color: "#702DFF", fontWeight: "bold" }}
            >
              {firstName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ marginLeft: 16, color: "#702DFF" }}>
              {showEmail}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginTop: 10,
            }}
          />
          <DrawerItem
            label="My Card"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="dot-circle-o" size={30} color={"#702DFF"} />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate(screenName);
            }}
          />
          <DrawerItem
            label="Analytics"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="check" size={30} color={"#702DFF"} />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Analytics");
            }}
          />
          <DrawerItem
            label="Scan"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={30}
                color={"#702DFF"}
              />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Scanner");
            }}
          />
          <DrawerItem
            label="Contact Support"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Contact Support");
            }}
          />
          <DrawerItem
            label="Manage Support"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Manage Support");
            }}
          />
          <DrawerItem
            label="App Version"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("App Version");
            }}
          />
          <DrawerItem
            label="Check for updates"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Check Updates");
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginTop: windowHeight - 650,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginTop: 10,
              }}
            />
            <DrawerItem
              label="Logout"
              labelStyle={{ color: "#702DFF" }}
              icon={({ color, size }) => (
                <MaterialIcons name="fingerprint" size={35} color={"#702DFF"} />
              )}
              onPress={async () => {
                handleClickVibration();
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Root",
                        state: { routes: [{ name: "Landing Screen" }] },
                      },
                    ],
                  })
                );
                userLogout();
              }}
            />
          </View>
        </>
      )}
      {roleOf === "2" && (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Icon
              name="chevron-with-circle-right"
              size={35}
              color={"#702DFF"}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
            {showImage ? (
              <Image
                source={{
                  uri: `https://bc.exploreanddo.com/${showImage}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                //resizeMode="contain"
              />
            ) : (
              <Image
                source={require("./assets/user.jpg")}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                //resizeMode="contain"
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{ marginLeft: 16, color: "#702DFF", fontWeight: "bold" }}
            >
              {firstName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ marginLeft: 16, color: "#702DFF" }}>
              {showEmail}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#702DFF",
              marginTop: 10,
            }}
          />
          <DrawerItem
            label="Home"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="dot-circle-o" size={30} color={"#702DFF"} />
            )}
            onPress={() => {
              navigation.navigate("Admin Home");
            }}
          />
          <DrawerItem
            label="Add Profile"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
            onPress={() => {
              navigation.navigate("Add User");
            }}
          />
          <DrawerItem
            label="Setting"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <MaterialIcons name="settings" size={25} color={"#702DFF"} />
            )}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginTop: windowHeight - 450,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#702DFF",
                marginTop: 10,
              }}
            />
            <DrawerItem
              label="Logout"
              labelStyle={{ color: "#702DFF" }}
              icon={({ color, size }) => (
                <MaterialIcons name="fingerprint" size={35} color={"#702DFF"} />
              )}
              onPress={async () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Root",
                        state: { routes: [{ name: "Landing Screen" }] },
                      },
                    ],
                  })
                );
                companyLogout();
              }}
            />
          </View>
        </>
      )}
      {roleOf === "3" && (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {showImage ? (
              <Image
                source={{
                  uri: `https://bc.exploreanddo.com/${showImage}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                //resizeMode="contain"
              />
            ) : (
              <Image
                source={require("./assets/user.jpg")}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                //resizeMode="contain"
              />
            )}

            <Icon
              name="chevron-with-circle-left"
              size={35}
              color={"#702DFF"}
              onPress={() => {
                handleClickVibration();
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{ marginLeft: 16, color: "#702DFF", fontWeight: "bold" }}
            >
              {firstName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ marginLeft: 16, color: "#702DFF" }}>
              {showEmail}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              marginTop: 10,
            }}
          />
          <DrawerItem
            label="My Card"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="dot-circle-o" size={30} color={"#702DFF"} />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate(screenName);
            }}
          />
          <DrawerItem
            label="Analytics"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="check" size={30} color={"#702DFF"} />
            )}
            onPress={() => {
              handleClickVibration();
              navigation.navigate("Analytics");
            }}
          />
          <DrawerItem
            label="Scan"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={30}
                color={"#702DFF"}
              />
            )}
          />
          <DrawerItem
            label="Contact Support"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
          />
          <DrawerItem
            label="Manage Support"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
          />
          <DrawerItem
            label="App Version"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
          />
          <DrawerItem
            label="Check for updates"
            labelStyle={{ color: "#702DFF" }}
            icon={({ color, size }) => (
              <FontAwesome name="plus" size={25} color={"#702DFF"} />
            )}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginTop: windowHeight - 650,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginTop: 10,
              }}
            />
            <DrawerItem
              label="Logout"
              labelStyle={{ color: "#702DFF" }}
              icon={({ color, size }) => (
                <MaterialIcons name="fingerprint" size={35} color={"#702DFF"} />
              )}
              onPress={async () => {
                handleClickVibration();
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Root",
                        state: { routes: [{ name: "Landing Screen" }] },
                      },
                    ],
                  })
                );
                userLogout();
              }}
            />
          </View>
        </>
      )}
    </DrawerContentScrollView>
  );
}

function Root({ navigation }) {
  const { handleClickVibration, token, roleOf, themeIds } = useAuth();
  const drawerPosition = roleOf === "2" ? "right" : "left";
  const customHeaderLeft = () => (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Image
        source={require("./assets/user.jpg")}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
    </TouchableOpacity>
  );
  const customHeaderRight = () => (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={() => {
        handleClickVibration();
        navigation.navigate("Display");
      }}
    >
      <MaterialIcons
        name="edit"
        size={25}
        color={"black"}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  );

  const customAdminHeaderRight = () => (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={() => {
        handleClickVibration();
        navigation.navigate("Admin Display");
      }}
    >
      <MaterialIcons
        name="edit"
        size={25}
        color={"black"}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            width: 260,
          },
          drawerPosition: roleOf === "2" ? "right" : "left",
        }}
      >
        {token ? (
          <>
            {roleOf === "4" && (
              <>
               <Drawer.Screen
                  name="UserTheme2"
                  component={UserTheme2}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="My Card"
                  component={MyCard}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="First Thing"
                  component={Firstthing}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme1"
                  component={UserTheme1}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
               
                <Drawer.Screen
                  name="UserTheme3"
                  component={UserTheme3}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                 <Drawer.Screen
                  name="UserTheme3_0"
                  component={UserTheme3_0}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme4"
                  component={UserTheme4}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme5"
                  component={UserTheme5}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme6"
                  component={UserTheme6}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Contacts"
                  component={Contacts}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Settings"
                  component={Settings}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />

                <Drawer.Screen
                  name="Scanned Cards"
                  component={ScannedCards}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Saved Scan"
                  component={SavedScan}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Share Profile"
                  component={ShareProfile}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
              </>
            )}
            {roleOf === "2" && (
              <>
                <Drawer.Screen
                  name="Admin Home"
                  component={AdminHome}
                  options={{
                    headerTitle: "",
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.dispatch(DrawerActions.toggleDrawer());
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          Digital Business Card
                        </Text>
                      </TouchableOpacity>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.dispatch(DrawerActions.toggleDrawer());
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 10,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="menu"
                          size={30}
                          color={"#8339FF"}
                        />
                      </TouchableOpacity>
                    ),
                  }}
                />
                <Drawer.Screen
                  name="AdminTheme1"
                  component={AdminTheme1}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    //headerRight: customAdminHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="AdminTheme2"
                  component={AdminTheme2}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    //headerRight: customAdminHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="AdminTheme3"
                  component={AdminTheme3}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    //headerRight: customAdminHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="AdminTheme4"
                  component={AdminTheme4}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    //headerRight: customAdminHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="AdminTheme5"
                  component={AdminTheme5}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    //headerRight: customAdminHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="AdminTheme6"
                  component={AdminTheme6}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    //headerRight: customAdminHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Emp Details"
                  component={EmpDetails}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    //headerRight: customAdminHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Share Profile"
                  component={ShareProfile}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
              </>
            )}
            {roleOf === "3" && (
              <>
                <Drawer.Screen
                  name="My Card"
                  component={MyCard}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="First Thing"
                  component={Firstthing}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme1"
                  component={UserTheme1}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme2"
                  component={UserTheme2}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme3"
                  component={UserTheme3}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                 <Drawer.Screen
                  name="UserTheme3_0"
                  component={UserTheme3_0}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme4"
                  component={UserTheme4}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme5"
                  component={UserTheme5}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="UserTheme6"
                  component={UserTheme6}
                  options={{
                    headerTitle: "",
                    //headerLeft: customHeaderLeft,
                    headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Contacts"
                  component={Contacts}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Settings"
                  component={Settings}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />

                <Drawer.Screen
                  name="Scanned Cards"
                  component={ScannedCards}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Saved Scan"
                  component={SavedScan}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
                <Drawer.Screen
                  name="Share Profile"
                  component={ShareProfile}
                  options={{
                    headerTitle: "",
                    // headerLeft: customHeaderLeft,
                    //headerRight: customHeaderRight,
                  }}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Landing Screen"
              component={LandingScreen}
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </>
  );
}

const App = () => {
  const toastRef = useRef();

  return (
    <ThemeProvider>
      <SafeAreaWrapper>
        <NavigationContainer>
          <AuthProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="Root"
                component={Root}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Reset Password"
                component={ForgotPassword}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Admin Login"
                component={AdminLogin}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Display"
                component={Display}
                options={{
                  headerShown: true,
                  headerLeft: null,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Edit Info"
                component={EditInfo}
                options={{
                  headerShown: true,
                  headerLeft: null,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Add Fields"
                component={AddFields}
                options={{
                  headerShown: true,
                  headerLeft: null,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Theme1"
                component={Theme1}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Theme2"
                component={Theme2}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Theme3"
                component={Theme3}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
               <Stack.Screen
                name="Theme3_0"
                component={Theme3_0}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Theme4"
                component={Theme4}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Theme5"
                component={Theme5}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Theme6"
                component={Theme6}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Select Theme"
                component={SelectTheme}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Enter Card Details"
                component={EnterCardDetails}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Layout"
                component={Layout}
                options={{
                  headerShown: true,
                  headerLeft: null,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Footer"
                component={Footer}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Analytics"
                component={Analytics}
              />
              <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Contact Support"
                component={ContactSupport}
                options={{
                  headerShown: true,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Manage Support"
                component={ManageSupport}
                options={{
                  headerShown: true,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="App Version"
                component={AppVersion}
                options={{
                  headerShown: true,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Help Center"
                component={HelpCenter}
                options={{
                  headerShown: true,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Privacy Policy"
                component={PrivacyPolicy}
                options={{
                  headerShown: true,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Feedback"
                component={Feedback}
                options={{
                  headerShown: true,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Check Updates"
                component={CheckUpdates}
                options={{
                  headerShown: true,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Lead Details"
                component={ContactDetails}
              />
              <Stack.Screen
                name="Admin Display"
                component={AdminDisplay}
                options={{
                  headerShown: true,
                  headerLeft: null,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Admin Edit Info"
                component={AdminEditInfo}
                options={{
                  headerShown: true,
                  headerLeft: null,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Admin Add Fields"
                component={AdminAddFields}
                options={{
                  headerShown: true,
                  headerLeft: null,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="ATheme1"
                component={ATheme1}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="ATheme2"
                component={ATheme2}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="ATheme3"
                component={ATheme3}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="ATheme4"
                component={ATheme4}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="ATheme5"
                component={ATheme5}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="ATheme6"
                component={ATheme6}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
              <Stack.Screen
                name="Admin Layout"
                component={AdminLayout}
                options={{
                  headerShown: true,
                  headerLeft: null,
                  headerTitle: "",
                }}
              />
              <Stack.Screen
                name="Add User"
                component={AddUser}
                options={{
                  headerShown: false,
                  headerLeft: null,
                }}
              />
            </Stack.Navigator>
          </AuthProvider>
          <Toast ref={toastRef} />
        </NavigationContainer>
      </SafeAreaWrapper>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  name: {
    color: "#702DFF",
    fontSize: 25,
  },
});
