import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthProvider";

const RootScreen = ({ route }) => {
  const { themeIds } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    switch (Number(themeIds)) {
      case 1:
        navigation.navigate("UserTheme1");
        break;
      case 2:
        navigation.navigate("UserTheme2");
        break;
      case 3:
        navigation.navigate("UserTheme3");
        break;
      case 4:
        navigation.navigate("UserTheme4");
        break;
      case 5:
        navigation.navigate("UserTheme5");
        break;
      case 6:
        navigation.navigate("UserTheme6");
        break;
      default:
        navigation.navigate("UserTheme1");
    }
  }, []);

  return <View />;
};

export default RootScreen;
