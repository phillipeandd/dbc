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
import Footer from "../../../screens/Footer/Footer";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import Toast from "react-native-toast-message";
const EditInfo = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { userId, handleClickVibration, roleOf } = useAuth();
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
      .get(`https://bc.exploreanddo.com/api/get-company-details/${userId}`)
      .then((response) => {
        const companyData = response.data.data;
        setFormData({
          businessname: companyData?.user?.user_details?.businessname,
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
  }, [userId]);
  //console.log("formData", formData);
  const handleSave = async () => {
    handleClickVibration();
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `https://bc.exploreanddo.com/api/edit-company-details/${userId}`,
        formData
      );
      console.log("Data updated successfully");
      Toast.show({
        type: "success",
        text1: `Details Updated Successfully`,
        position: "top",
        visibilityTime: 4000,
      });
      navigation.navigate("Add Fields");
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
                navigation.navigate("Display");
              }}
            >
              <Text style={styles.label}>Display</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleClickVibration();
                navigation.navigate("Edit Info");
              }}
            >
              <LinearGradient
                colors={["#702DFF", "#702DFF"]}
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
                navigation.navigate("Add Fields");
              }}
            >
              <Text style={styles.label}>Add Fields</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.containerInput}>
          <View style={styles.formContainer}>
          {roleOf === "3" ? (
          <>
            <Text style={[styles.inputLabel,{marginBottom:5}]}>Note: You don't have permission to edit these values.</Text>
          </>
        ) : (
          <>
            <Text style={styles.inputLabel}></Text>
          </>
        )}

            <Text style={styles.inputLabelBold}>Personal</Text>
            {roleOf === "3" ? (
              <>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9, color: "black" }]}
                  placeholder="Full Name"
                  value={formData.businessname}
                  onChangeText={(text) =>
                    setFormData({ ...formData, businessname: text })
                  }
                  editable={false}
                />
              </>
            ) : (
              <>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9 }]}
                  placeholder="Full Name"
                  value={formData.businessname}
                  onChangeText={(text) =>
                    setFormData({ ...formData, businessname: text })
                  }
                />
              </>
            )}

            <Text style={[styles.inputLabelBold, { marginTop: 10 }]}>
              Affiliations
            </Text>
            {roleOf === "3" ? (
              <>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9, color: "black" }]}
                  placeholder="Title"
                  value={formData.title}
                  onChangeText={(text) =>
                    setFormData({ ...formData, title: text })
                  }
                  editable={false}
                />
              </>
            ) : (
              <>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9 }]}
                  placeholder="Title"
                  value={formData.title}
                  onChangeText={(text) =>
                    setFormData({ ...formData, title: text })
                  }
                />
              </>
            )}

            {roleOf === "3" ? (
              <>
                <Text style={styles.inputLabel}>Department</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9, color: "black" }]}
                  placeholder="Department"
                  value={formData.department}
                  onChangeText={(text) =>
                    setFormData({ ...formData, department: text })
                  }
                  editable={false}
                />
              </>
            ) : (
              <>
                <Text style={styles.inputLabel}>Department</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9 }]}
                  placeholder="Department"
                  value={formData.department}
                  onChangeText={(text) =>
                    setFormData({ ...formData, department: text })
                  }
                />
              </>
            )}

            {roleOf === "3" ? (
              <>
                <Text style={styles.inputLabel}>Company</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9, color: "black" }]}
                  placeholder="Company"
                  value={formData.company_name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, company_name: text })
                  }
                  editable={false}
                />
              </>
            ) : (
              <>
                <Text style={styles.inputLabel}>Company</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9 }]}
                  placeholder="Company"
                  value={formData.company_name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, company_name: text })
                  }
                />
              </>
            )}

            {roleOf === "3" ? (
              <>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9, color: "black" }]}
                  placeholder="Phone"
                  value={formData.phone.toString()}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phone: text })
                  }
                  keyboardType="phone-pad"
                  maxLength={10}
                  editable={false}
                />
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={[styles.input, { width: width * 0.9, color: "black" }]}
                  placeholder="Address"
                  value={formData.address}
                  onChangeText={(text) =>
                    setFormData({ ...formData, address: text })
                  }
                  editable={false}
                />
                <Text style={styles.inputLabel}>Headlines</Text>
                <TextInput
                  style={[
                    styles.textArea,
                    { width: width * 0.9, color: "black", height: width * 0.2 },
                  ]}
                  placeholder="Headlines"
                  multiline={true}
                  numberOfLines={4}
                  value={formData.headline}
                  onChangeText={(text) =>
                    setFormData({ ...formData, headline: text })
                  }
                  editable={false}
                />
              </>
            ) : (
              <>
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
                  style={[styles.textArea, { width: width * 0.9 , height: width * 0.2}]}
                  placeholder="Headlines"
                  multiline={true}
                  numberOfLines={4}
                  value={formData.headline}
                  onChangeText={(text) =>
                    setFormData({ ...formData, headline: text })
                  }
                />
              </>
            )}
          </View>
        </View>
        {roleOf === "4" ? (
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
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              marginBottom: "80%",
            }}
          ></View>
        )}
      </ScrollView>

      <Footer navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

export default EditInfo;

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
    color: "#702DFF",
  },
  inputLabel: {
    fontSize: Dimensions.get("window").height * 0.015,
    fontWeight: "bold",
    marginTop: 10,
    color: "#393939",
  },
  input: {
    height: Dimensions.get("window").height * 0.05,
    borderColor: "#702DFF",
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
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
   
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#702DFF",
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
    borderColor: "#702DFF",
    borderWidth: 1,
  },
});
