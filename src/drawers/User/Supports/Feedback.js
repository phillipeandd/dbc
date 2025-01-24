import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
const Feedback = () => {
  const { width, height } = Dimensions.get("window");
  const { userId, handleClickVibration, roleOf } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  //console.log("rating", rating);
  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const handleSave = async () => {
    handleClickVibration();
    if (feedback === "" && rating === 0) {
      Toast.show({
        type: "info",
        text1: `Please enter your valuable feedback`,
        position: "top",
        visibilityTime: 4000,
      });
    } else {
      Toast.show({
        type: "success",
        text1: `Feedback saved successfully`,
        position: "top",
        visibilityTime: 4000,
      });
    }

  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      <Text style={styles.inputLabel}>Feedback</Text>
      <TextInput
        style={[styles.textArea, { width: width * 0.9, height: width * 0.4 }]}
        placeholder="Enter your valuable feedback"
        multiline={true}
        numberOfLines={10}
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
      />
      <View
        style={[
          {
            elevation: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            //paddingHorizontal: Dimensions.get("window").width * 0.05,
            paddingVertical: Dimensions.get("window").height * 0.01,
            marginVertical: Dimensions.get("window").height * 0.03,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "90%",
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <Text
              key={num}
              style={{
                fontSize: 34,
                fontWeight: "400",
                // cursor: "pointer",
                color:
                  num <= rating
                    ? num === rating
                      ? "#702DFF"
                      : "#702DFF"
                    : num > rating
                      ? "gray"
                      : "gray",
              }}
              onPress={() => handleStarClick(num)}
            >
              ✰
            </Text>
          ))}
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleSave}
          style={[{ marginBottom: "80%" }]}
        >
          <LinearGradient
            colors={["#702DFF", "#702DFF", "#702DFF"]}
            start={[1, 0]}
            end={[0, 1]}
            style={[styles.button, { width: width * 0.9 }]}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: Dimensions.get("window").height * 0.015,
    fontWeight: "bold",
    marginTop: 10,
    color: "#393939",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#702DFF",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  button: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
