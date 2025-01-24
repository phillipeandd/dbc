import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ATheme4 from "../AThemes/ATheme4";
import AdminFooter from "../../../screens/Footer/AdminFooter";

const AdminTheme4 = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["white", "#FCD1D1"]}
      style={[styles.gradientBackground, { marginTop: "-15%" }]}
      start={[0, 0]}
      end={[0, 1]}
    >
      <ATheme4 navigation={navigation} />
      <AdminFooter navigation={navigation} />
    </LinearGradient>
  );
};

export default AdminTheme4;

const styles = StyleSheet.create({});
