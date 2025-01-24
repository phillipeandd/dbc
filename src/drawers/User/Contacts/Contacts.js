import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../../screens/Footer/Footer";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthProvider";
import axios from "axios";
import { format } from "date-fns";

const Contacts = ({ navigation }) => {
  const { userId } = useAuth();
  const [seeLeads, setSeeLeads] = useState([]);
  //console.log("seeLeads", seeLeads);
  const fetchData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-user-connects/${userId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSeeLeads(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 3000);
    // return () => clearInterval(intervalId);
  }, [fetchData]);

  const userData = [
    {
      id: 1,
      name: "Mohammad Nadeem",
      date: "15-January-2024",
      star: "⭐⭐⭐⭐ ✰",
      image: require("../../../../assets/user.jpg"),
      email: "nadeem@email.com",
      phone: "95165475203",
      company: "Global It",
    },
    {
      id: 2,
      name: "Farha Fatima",
      date: "11-January-2024",
      star: "⭐⭐⭐✰ ✰",
      image: require("../../../../assets/avatar2.jpg"),
      email: "fatima@email.com",
      phone: "6258795401",
      company: "Epam Industries",
    },
    {
      id: 3,
      name: "Marcos Abait",
      date: "09-January-2024",
      star: "⭐⭐✰ ✰ ✰",
      image: require("../../../../assets/avatar1.jpg"),
      email: "marcos@email.com",
      phone: "7569842054",
      company: "Ventures Limited",
    },
    {
      id: 4,
      name: "Jennifer Glenn",
      date: "01-January-2024",
      star: "⭐⭐⭐⭐ ✰",
      image: require("../../../../assets/avatar3.jpg"),
      email: "jennifer@email.com",
      phone: "8645968750",
      company: "Explore & Do",
    },
    {
      id: 5,
      name: "Jacob Umaz",
      date: "01-January-2024",
      star: "⭐⭐✰ ✰ ✰",
      image: require("../../../../assets/avatar4.jpg"),
      email: "jacob@email.com",
      phone: "7302115620",
      company: "Indiana University",
    },
    {
      id: 6,
      name: "Marcos Abait",
      date: "09-January-2024",
      star: "⭐⭐✰ ✰ ✰",
      image: require("../../../../assets/avatar1.jpg"),
      email: "marcos@email.com",
      phone: "7569842054",
      company: "Ventures Limited",
    },
    {
      id: 7,
      name: "Jennifer Glenn",
      date: "01-January-2024",
      star: "⭐⭐⭐⭐ ✰",
      image: require("../../../../assets/avatar3.jpg"),
      email: "jennifer@email.com",
      phone: "8645968750",
      company: "Explore & Do",
    },
    {
      id: 8,
      name: "Jacob Umaz",
      date: "01-January-2024",
      star: "⭐⭐✰ ✰ ✰",
      image: require("../../../../assets/avatar4.jpg"),
      email: "jacob@email.com",
      phone: "7302115620",
      company: "Indiana University",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: "20%" }}>
        {seeLeads.length === 0 ? (
          <>
            <TouchableOpacity style={{ marginTop: 5 }}>
            <LinearGradient
            colors={["#EDCDFF", "white"]}
            start={[1, 0]}
            end={[0, 1]}
            style={[
              styles.rightContainer,
              {
                justifyContent: "center",
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                { textAlign: "center", fontSize: 20, fontWeight: "400",color:"#702DFF" },
              ]}
            >
              No Leads Available
            </Text>
          </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          seeLeads.map((user) => {
            const createdAt = user.created_at;
            const formattedDate = format(new Date(createdAt), "dd-MMMM-yyyy");
            const formattedTime = format(new Date(createdAt), "hh:mm:ss a");
            return (
              <TouchableOpacity
                key={user.id}
                style={{ marginTop: 5 }}
                onPress={() =>
                  navigation.navigate("Contact Details", {
                    contactDetails: user,
                  })
                }
              >
                <LinearGradient
                  colors={["white", "white"]}
                  start={[1, 0]}
                  end={[0, 1]}
                  style={styles.rightContainer}
                >
                  <View style={styles.row}>
                    <Image
                      source={require("../../../../assets/avatar4.jpg")}
                      style={styles.image}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{user.fullname}</Text>
                      <Text style={styles.subtitle}>
                        {formattedDate}, {formattedTime}
                      </Text>
                      <Text>{user.leads ? "⭐".repeat(user.leads) : ""}</Text>
                    </View>
                  </View>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    color="#8339FF"
                    style={styles.dotsIcon}
                  />
                </LinearGradient>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },

  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    overflow: "hidden",
    position: "relative",
  },
  dotsIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    //transform: [{ translateY: 15 }],
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 14,
    color: "#8339FF",
  },
});
