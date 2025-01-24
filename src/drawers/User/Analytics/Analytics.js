import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { StatusBar } from "expo-status-bar";
const Analytics = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const showCalendar = () => {
    setIsPopoverVisible(true);
  };

  const hideCalendar = () => {
    setIsPopoverVisible(false);
  };

  const handleDayPress = async (day) => {
    //console.log("Selected day:", day);
    const postData = {
      from_date: day.dateString,
    };
    try {
      const response = await fetch(
        "https://gasstation.exploreanddo.com/api/filter-bills-by-date",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      const data = await response.json();
      //console.log("Selected Day API", data.data);
      setVisiblePrevBills(data.data);
    } catch (error) {
      console.error("Selected Day error:", error);
    } finally {
      setIsPopoverVisible(false);
    }
    hideCalendar();
  };
  return (
    <ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#702DFF",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            margin: 10,
          }}
          onPress={showCalendar}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Filter By Date
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isPopoverVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={hideCalendar}
      >
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <BlurView intensity={5} tint="light" style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 15,
                  marginTop: 35,
                  borderBottomLeftRadius: 60,
                  borderBottomRightRadius: 60,
                }}
              >
                <TouchableOpacity
                  onPress={hideCalendar}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={25}
                    color="#702DFF"
                    style={{ marginRight: 5, padding: 5 }}
                  />
                </TouchableOpacity>

                <Calendar
                // onDayPress={handleDayPress}
                />
              </View>
            </BlurView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      {Platform.OS === "android" && (
        <StatusBar backgroundColor="#702DFF" barStyle="light-content" />
      )}
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: "#EDCDFF",
          borderRadius: 10,
          padding: 25,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text
              style={{ color: "#702DFF", fontWeight: "bold", fontSize: 32 }}
            >
              137
            </Text>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
              Views
            </Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text
              style={{ color: "#702DFF", fontWeight: "bold", fontSize: 32 }}
            >
              67
            </Text>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
              Clicks
            </Text>
          </View>

          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text
              style={{ color: "#702DFF", fontWeight: "bold", fontSize: 32 }}
            >
              31%
            </Text>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
              Click Rates
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="eye"
              size={25}
              color="#604A49"
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: "#702DFF", fontWeight: "bold" }}>
              137 Views
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <MaterialIcons name="info-outline" size={25} color="#604A49" />
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="touch-app"
              size={25}
              color="#604A49"
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: "#702DFF", fontWeight: "bold" }}>
              67 Clicks
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <MaterialIcons name="info-outline" size={25} color="#604A49" />
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="contacts"
              size={25}
              color="#604A49"
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: "#702DFF", fontWeight: "bold" }}>
              53 Contacts
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <MaterialIcons name="info-outline" size={25} color="#604A49" />
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="percent"
              size={25}
              color="#604A49"
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: "#702DFF", fontWeight: "bold" }}>
              31% Click Rates
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <MaterialIcons name="info-outline" size={25} color="#604A49" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Analytics;

const styles = StyleSheet.create({});
