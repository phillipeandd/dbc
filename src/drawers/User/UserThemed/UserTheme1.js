import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Theme1 from "../Themes/Theme1";
import Footer from "../../../screens/Footer/Footer";


const UserTheme1 = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["white", "#FCD1D1"]}
      style={[styles.gradientBackground, { marginTop: "-15%" }]}
      start={[0, 0]}
      end={[0, 1]}
    >
      <Theme1 navigation={navigation} />
      
      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

export default UserTheme1;

const styles = StyleSheet.create({});
