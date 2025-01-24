import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../../../screens/Footer/Footer";
import Theme5 from "../Themes/Theme5";

const UserTheme5 = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["white", "#FCD1D1"]}
      style={[styles.gradientBackground, { marginTop: "-15%" }]}
      start={[0, 0]}
      end={[0, 1]}
    >
      <Theme5 navigation={navigation} />
      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

export default UserTheme5;

const styles = StyleSheet.create({});
