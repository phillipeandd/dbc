import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ATheme1 from "../AThemes/ATheme1";
import AdminFooter from "../../../screens/Footer/AdminFooter";

const AdminTheme1 = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["white", "#FCD1D1"]}
      style={[styles.gradientBackground, { marginTop: "-15%" }]}
      start={[0, 0]}
      end={[0, 1]}
    >
      <ATheme1 navigation={navigation} />
      <AdminFooter navigation={navigation} />
    </LinearGradient>
  );
};

export default AdminTheme1;

const styles = StyleSheet.create({});
