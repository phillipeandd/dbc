import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Footer from "../../Footer/Footer";

const Firstthing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>First things first...</Text>
      <Text style={[styles.text, { color: "#F45A57" }]}>
        add your business cards!
      </Text>
      
      <TouchableOpacity
        onPress={() => navigation.navigate("Enter Card Details")}
      >
        <Image source={require("../../../../assets/add-cards.jpg")} />
      </TouchableOpacity>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Firstthing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
