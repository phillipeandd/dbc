import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Toast from "react-native-toast-message";
import AdminFooter from "../../../screens/Footer/AdminFooter";
import { useAuth } from "../../../context/AuthProvider";
import { useRoute } from "@react-navigation/native";

const AdminEditInfo = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { userId, handleClickVibration } = useAuth();
  const route = useRoute();
  const empId = route.params.empId;
  //console.log("empIdInfo", empId);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessname: "",
    title: "",
    department: "",
    company_name: "",
    phone: "",
    address: "",
    headline: "",
  });



  const fetchData = () => {
    axios
      .get(`https://bc.exploreanddo.com/api/get-company-details/${empId}`)
      .then((response) => {
        const companyData = response.data.data;
        setFormData({
          businessname: `${companyData?.user?.firstname} ${
            companyData?.user?.lastname ? companyData?.user?.lastname : ""
          }`,
          title: companyData?.user?.user_details?.title,
          department: companyData?.user?.user_details?.department,
          company_name: companyData?.user?.user_details?.company_name,
          phone: companyData?.user?.phone,
          address: companyData?.user?.user_details?.address,
          headline: companyData?.user?.user_details?.headline,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    handleClickVibration();
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `https://bc.exploreanddo.com/api/edit-company-details/${empId}`,
        formData
      );
      console.log("Data updated successfully");
      Toast.show({
        type: "success",
        text1: `Details Updated Successfully`,
        position: "top",
        visibilityTime: 4000,
      });
      navigation.navigate("Admin Add Fields", { empId: empId });
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: "20%" }}>
        <View style={styles.content}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonBorder}
              // onPress={() => navigation.navigate("Display")}
              onPress={() => {
                handleClickVibration();
                navigation.navigate("Admin Display", {
                  empId: empId,
                });
              }}
            >
              <Text style={styles.label}>Display</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleClickVibration();
                navigation.navigate("Admin Edit Info", {
                  empId: empId,
                });
              }}
            >
              <LinearGradient
                colors={["white", "#8339FF"]}
                start={[1, 0]}
                end={[0, 1]}
                style={styles.button}
              >
                <Text style={styles.title}>Edit Info</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonBorder}
              onPress={() => {
                handleClickVibration();
                navigation.navigate("Admin Add Fields", {
                  empId: empId,
                });
              }}
            >
              <Text style={styles.label}>Add Fields</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerInput}>
          <View style={styles.formContainer}>
            <Text style={styles.inputLabelBold}>Personal</Text>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={[styles.input, { width: width * 0.9 }]}
              placeholder="Full Name"
              value={formData.businessname}
              onChangeText={(text) =>
                setFormData({ ...formData, businessname: text })
              }
            />
            <Text style={[styles.inputLabelBold, { marginTop: 10 }]}>
              Affiliations
            </Text>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={[styles.input, { width: width * 0.9 }]}
              placeholder="Title"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />

            <Text style={styles.inputLabel}>Department</Text>
            <TextInput
              style={[styles.input, { width: width * 0.9 }]}
              placeholder="Department"
              value={formData.department}
              onChangeText={(text) =>
                setFormData({ ...formData, department: text })
              }
            />
            <Text style={styles.inputLabel}>Company</Text>
            <TextInput
              style={[styles.input, { width: width * 0.9 }]}
              placeholder="Company"
              value={formData.company_name}
              onChangeText={(text) =>
                setFormData({ ...formData, company_name: text })
              }
            />
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={[styles.input, { width: width * 0.9 }]}
              placeholder="Phone"
              value={formData.phone.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, phone: text })
              }
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={[styles.input, { width: width * 0.9 }]}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) =>
                setFormData({ ...formData, address: text })
              }
            />
            <Text style={styles.inputLabel}>Headlines</Text>
            <TextInput
              style={[styles.textArea, { width: width * 0.9,height: width * 0.2 }]}
              placeholder="Headlines"
              multiline={true}
              numberOfLines={4}
              value={formData.headline}
              onChangeText={(text) =>
                setFormData({ ...formData, headline: text })
              }
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity onPress={handleSave} style={{marginBottom:120}}>
            <LinearGradient
              colors={["#8339FF", "white"]}
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
      </ScrollView>

      <AdminFooter navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

export default AdminEditInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    //marginTop: 50,
  },
  containerInput: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#eee",
  },
  formContainer: {
    width: Dimensions.get("window").width * 0.9,
  },
  inputLabelBold: {
    fontSize: Dimensions.get("window").height * 0.015,
    fontWeight: "bold",
    color: "#8339FF",
  },
  inputLabel: {
    fontSize: Dimensions.get("window").height * 0.015,
    fontWeight: "bold",
    marginTop: 10,
    color: "#393939",
  },
  input: {
    height: Dimensions.get("window").height * 0.05,
    borderColor: "#8339FF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#8339FF",
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
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8339FF",
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
  buttonBorder: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#8339FF",
    borderWidth: 1,
  },
});
