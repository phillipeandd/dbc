import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../../../screens/Footer/Footer";
import Theme3 from "../Themes/Theme3";

const UserTheme3 = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["white", "#FCD1D1"]}
      style={[styles.gradientBackground, { marginTop: "-15%" }]}
      start={[0, 0]}
      end={[0, 1]}
    >
      <Theme3 navigation={navigation} />
      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

export default UserTheme3;

const styles = StyleSheet.create({});
