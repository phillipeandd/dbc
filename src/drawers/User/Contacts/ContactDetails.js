import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import Footer from "../../../screens/Footer/Footer";
import { Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { format } from "date-fns";

const ContactDetails = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const route = useRoute();
  const contactDetails = route.params.contactDetails;
  //console.log("Contact Details", contactDetails);
  const createdAt = contactDetails.created_at;
  const formattedDate = format(new Date(createdAt), "dd-MMMM-yyyy");
  const formattedTime = format(new Date(createdAt), "hh:mm:ss a");
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: "20%" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            // source={contactDetails.image}
            source={require("../../../../assets/avatar4.jpg")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderColor: "#702DFF",
              borderWidth: 2,
            }}
            resizeMode="contain"
          />
          <Text style={[{ fontSize: 24, color: "black", fontWeight: "bold" }]}>
            {contactDetails.fullname ? contactDetails.fullname : ""}
          </Text>
          <Text style={[{ color: "gray", fontWeight: "bold" }]}>
            Connected: {formattedDate}, {formattedTime}
          </Text>
          <View
            style={[
              {
                elevation: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 15,
                paddingHorizontal: Dimensions.get("window").width * 0.05,
                paddingVertical: Dimensions.get("window").height * 0.01,
                marginVertical: Dimensions.get("window").height * 0.03,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "90%",
              },
            ]}
          >
            <Text>Lead Quality</Text>
            <Text
              style={[{ fontSize: 28, color: "black", fontWeight: "bold" }]}
            >
              {/* {contactDetails.leads ? contactDetails.leads : ""} */}
              {contactDetails.leads ? '⭐'.repeat(contactDetails.leads) : ""}
            </Text>
          </View>
          <View
            style={[
              {
                elevation: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 15,
                paddingHorizontal: Dimensions.get("window").width * 0.05,
                paddingVertical: Dimensions.get("window").height * 0.01,
                marginVertical: Dimensions.get("window").height * 0.03,
                // justifyContent: "center",
                // alignItems: "center",
                // textAlign: "center",
                width: "90%",
              },
            ]}
          >
            <View style={[styles.input, { width: width * 0.8 }]}>
              <Text style={{ fontSize: 12, marginTop: 5, color: "#35C7F3" }}>
                Email
              </Text>
              <TextInput
                // style={[styles.input, { width: width * 0.8 }]}
                placeholder="Email"
                type="email"
                name="email"
                value={contactDetails.email ? contactDetails.email : ""}
              />
            </View>
            <View style={[styles.input, { width: width * 0.8 }]}>
              <Text style={{ fontSize: 12, marginTop: 5, color: "#35C7F3" }}>
                Phone
              </Text>
              <TextInput
                // style={[styles.input, { width: width * 0.8 }]}
                placeholder="Phone"
                keyboardType="phone-pad"
                name="phone"
                value={contactDetails.phone ? contactDetails.phone.toString() : ""}
              
              />
            </View>
            <View style={[styles.input, { width: width * 0.8 }]}>
              <Text style={{ fontSize: 12, marginTop: 5, color: "#35C7F3" }}>
                Company
              </Text>
              <TextInput
                // style={[styles.input, { width: width * 0.8 }]}
                placeholder="Company"
                type="email"
                name="email"
                value={contactDetails.company ? contactDetails.company : ""}
              />
            </View>
            <View style={[styles.textArea, { width: width * 0.8 }]}>
              <Text style={{ fontSize: 12, marginTop: 5, color: "#35C7F3" }}>
                Note
              </Text>
              <TextInput
                // style={[styles.textArea, { width: width * 0.8 }]}
                // placeholder="Note"
                value={contactDetails.note ? contactDetails.note : ""}
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    marginTop: 10,
  },
  input: {
    height: Dimensions.get("window").height * 0.067,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F5EDED",
    //elevation: 1,
    //shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: Dimensions.get("window").height * 0.015,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 5,
    color: "#F45A57",
  },
  textArea: {
    // borderWidth: 1,
    // borderColor: "#702DFF",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#F5EDED",
    elevation: 1,
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginTop: 10,
  },
});
