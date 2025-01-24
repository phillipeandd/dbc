import { StyleSheet, Text, View, ActivityIndicator, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import packageJson from "../../../../package.json";

const CheckUpdates = () => {
  const [loading, setLoading] = useState(true);
  const appVersion = packageJson.version;

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
      redirectToPlayStore();
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const redirectToPlayStore = () => {
    const appStoreUrl = "https://apps.apple.com";
    Linking.openURL(appStoreUrl);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : (
        <Text style={styles.text}>
          Stay ahead with the latest updates! Welcome to{" "}
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            Digital Business Card{" "}
          </Text>
          version{" "}
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            {appVersion},{" "}
          </Text>
          where innovation meets convenience. With this release, we've fine-tuned
          performance, squashed bugs, and introduced exciting new features to
          enhance your user experience. Get ready to explore a smoother, more
          efficient Digital Business Card experience like never before!
        </Text>
      )}
    </View>
  );
};

export default CheckUpdates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
    color: "#333",
    fontStyle: "italic",
  },
});
