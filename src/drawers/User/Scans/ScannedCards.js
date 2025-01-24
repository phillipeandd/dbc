import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const ScannedCards = () => {
  const route = useRoute();
  const qrData = route.params.qrData;
  console.log("qrData", qrData);
  const [seeAllStore, setSeeAllStore] = useState(null);
  console.log("seeAllStore", seeAllStore);
  const fetchData = useCallback(() => {
    const apiUrl = qrData;
    axios
      .get(apiUrl)
      .then((response) => {
        setSeeAllStore(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <View>
      <Text>ScannedCards</Text>
      <View>
        <Text style={[styles.imageText, { fontSize: 12, color: "blue" }]}>
          {seeAllStore?.company_name ? seeAllStore?.company_name : ""}
        </Text>
        <Text style={[styles.imageText, { fontSize: 8, color: "#DC4F20" }]}>
          {seeAllStore?.company_name ? seeAllStore?.company_name : ""}
        </Text>
      </View>
    </View>
  );
};

export default ScannedCards;

const styles = StyleSheet.create({});
