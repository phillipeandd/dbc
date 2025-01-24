import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ContactSupport = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions or find difficulties using this app any time,
        You can contact to us on this email{" "}
        <Text style={styles.strong}>spectrumfthyd0@gmail.com</Text>
      </Text>
    </View>
  );
};

export default ContactSupport;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  paragraph: {
    marginBottom: 10,
  },

  strong: {
    fontWeight: "bold",
  },
});
