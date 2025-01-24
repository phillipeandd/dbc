import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Theme1 from "../../../drawers/User/Themes/Theme1";
import Theme2 from "../../../drawers/User/Themes/Theme2";
import Theme3 from "../../../drawers/User/Themes/Theme3";
import Theme4 from "../../../drawers/User/Themes/Theme4";
import Theme5 from "../../../drawers/User/Themes/Theme5";
import Theme6 from "../../../drawers/User/Themes/Theme6";

const SelectTheme = () => {
  const { width, height } = Dimensions.get("window");
  const themeHeight = height * 0.6; 

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.inputLabelBold}>
          Select your page style you want to
        </Text>
        <Text style={styles.inputLabelBold}>
          share with your prospects and clients
        </Text>
      </View>

      <View style={styles.scrollViewContainer}>
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          <View style={[styles.themeContainer, { heightthemeHeight }]}>
            <Theme1 />
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.themeContainer, { height: themeHeight }]}>
            <Theme2 />
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.themeContainer, { height: themeHeight }]}>
            <Theme3 />
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.themeContainer, { height: themeHeight }]}>
            <Theme4 />
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.themeContainer, { height: themeHeight }]}>
            <Theme5 />
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.themeContainer, { height: themeHeight }]}>
            <Theme6 />
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[styles.button, { width: width * 0.9 }]}
      >
        <Text style={styles.buttonText}>Select Style</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectTheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabelBold: {
    fontWeight: "400",
  },
  scrollViewContainer: {
    width: "100%",
  },
  scrollView: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  themeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  gap: {
    width: 20,
  },
  button: {
    backgroundColor: "#161616",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});



