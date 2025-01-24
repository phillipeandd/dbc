import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ATheme3 from "../AThemes/ATheme3";
import AdminFooter from "../../../screens/Footer/AdminFooter";

const AdminTheme3 = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["white", "#FCD1D1"]}
      style={[styles.gradientBackground, { marginTop: "-15%" }]}
      start={[0, 0]}
      end={[0, 1]}
    >
      <ATheme3 navigation={navigation} />
      <AdminFooter navigation={navigation} />
    </LinearGradient>
  );
};

export default AdminTheme3;

const styles = StyleSheet.create({});
