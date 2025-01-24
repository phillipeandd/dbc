import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import AdminFooter from "../../../screens/Footer/AdminFooter";
import { useRoute } from "@react-navigation/native";
const AdminAddFields = ({ navigation }) => {
  const { userId, handleClickVibration } = useAuth();
  const { width, height } = Dimensions.get("window");
  const route = useRoute();
  const empId = route.params.empId;
  //console.log("empIdFields", empId);
  const [social, setSocial] = useState("");

  const fetchSocialData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/${empId}`;
    //const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/5`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSocial(response.data.data);
        setWebsite(response.data.data.website);
        setEmail(response.data.data.email);
        setLink(response.data.data.link);
        setAddress(response.data.data.address);
        setWhatsapp(response.data.data.whatsapp);
        setTwitter(response.data.data.twitter);
        setLinkedIn(response.data.data.linkedIn);
        setFacebook(response.data.data.facebook);
        setTiktok(response.data.data.tiktok);
        setYoutube(response.data.data.youtube);
        setInstagram(response.data.data.instagram);
        setBehance(response.data.data.behance);
        setDiscord(response.data.data.discord);
        setSkype(response.data.data.skype);
        setTelegram(response.data.data.telegram);
        setReddit(response.data.data.reddit);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [empId]);

  useEffect(() => {
    fetchSocialData();
  }, [fetchSocialData]);

  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [address, setAddress] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [behance, setBehance] = useState("");
  const [discord, setDiscord] = useState("");
  const [skype, setSkype] = useState("");
  const [telegram, setTelegram] = useState("");
  const [reddit, setReddit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (item) => {
    handleClickVibration();
    setSelectedItem(item);
  };

  const renderPopover = () => {
    if (!selectedItem) return null;
    const popoverWidth = Dimensions.get("window").width * 0.8;
    const popoverPosition = {
      top: (Dimensions.get("window").height - 200) / 3,
      left: (Dimensions.get("window").width - popoverWidth) / 2,
    };
    switch (selectedItem) {
      case "Website":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Website</Text>
              </View>
              <TextInput
                placeholder="Website URL"
                style={styles.input}
                type="text"
                name="website"
                value={website}
                //value={social.website ? `${social.website}` : website}
                onChangeText={(text) => setWebsite(text)}
              />
              <TextInput placeholder="Title" style={styles.input} />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("website")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Email":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Email</Text>
              </View>
              <TextInput
                placeholder="Email"
                style={styles.input}
                type="email-address"
                name="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("email")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Link":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Link</Text>
              </View>
              <TextInput
                placeholder="https://"
                style={styles.input}
                type="text"
                name="link"
                value={link}
                onChangeText={(text) => setLink(text)}
              />
              <TextInput placeholder="Title" style={styles.input} />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("link")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Address":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Adress</Text>
              </View>
              <TextInput
                placeholder="Address"
                style={styles.input}
                type="text"
                name="address"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
              <TextInput placeholder="Title" style={styles.input} />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("address")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "WhatsApp":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add WhatsApp Number</Text>
              </View>
              <TextInput
                placeholder="WhatsApp Number"
                style={styles.input}
                keyboardType="phone-pad"
                maxLength={10}
                type="text"
                name="whatsapp"
                value={whatsapp}
                onChangeText={(text) => setWhatsapp(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("whatsapp")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Twitter":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>
                  Add Twitter Username
                </Text>
              </View>
              <TextInput
                placeholder="Twitter Username"
                style={styles.input}
                type="text"
                name="twitter"
                value={twitter}
                onChangeText={(text) => setTwitter(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("twitter")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "LinkedIn":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add LinkedIn</Text>
              </View>
              <TextInput
                placeholder="LinkedIn URL"
                style={styles.input}
                type="text"
                name="linkedIn"
                value={linkedIn}
                onChangeText={(text) => setLinkedIn(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("linkedIn")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Facebook":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>
                  Add Facebook Id or Email
                </Text>
              </View>
              <TextInput
                placeholder="Facebook Id or Email"
                style={styles.input}
                type="text"
                name="facebook"
                value={facebook}
                onChangeText={(text) => setFacebook(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("facebook")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Tiktok":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Tiktok Username</Text>
              </View>
              <TextInput
                placeholder="Tiktok username"
                style={styles.input}
                type="text"
                name="tiktok"
                value={tiktok}
                onChangeText={(text) => setTiktok(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("tiktok")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "YouTube":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add YouTube Link</Text>
              </View>
              <TextInput
                placeholder="Youtube URL"
                style={styles.input}
                type="text"
                name="youtube"
                value={youtube}
                onChangeText={(text) => setYoutube(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("youtube")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Instagram":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Instagram Id</Text>
              </View>
              <TextInput
                placeholder="Instagram username"
                style={styles.input}
                type="text"
                name="instagram"
                value={instagram}
                onChangeText={(text) => setInstagram(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("instagram")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Behance":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Behance Id</Text>
              </View>
              <TextInput
                placeholder="Behance username"
                style={styles.input}
                type="text"
                name="behance"
                value={behance}
                onChangeText={(text) => setBehance(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("behance")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Discord":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Discord Id</Text>
              </View>
              <TextInput
                placeholder="Discord Id or username"
                style={styles.input}
                type="text"
                name="discord"
                value={discord}
                onChangeText={(text) => setDiscord(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("discord")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Skype":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Skype Id</Text>
              </View>
              <TextInput
                placeholder="Skype Id or Email"
                style={styles.input}
                type="text"
                name="skype"
                value={skype}
                onChangeText={(text) => setSkype(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("skype")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Telegram":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Telegram Number</Text>
              </View>
              <TextInput
                placeholder="Telegram Number or username"
                style={styles.input}
                type="text"
                name="telegram"
                value={telegram}
                onChangeText={(text) => setTelegram(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("telegram")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      case "Reddit":
        return (
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View
              style={[styles.popover, popoverPosition, { width: popoverWidth }]}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
                onPress={() => setSelectedItem(null)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#8339FF"
                  onPress={() => setSelectedItem(null)}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.removeButtonText}>Add Reddit </Text>
              </View>
              <TextInput
                placeholder="Reddit username"
                style={styles.input}
                type="text"
                name="reddit"
                value={reddit}
                onChangeText={(text) => setReddit(text)}
              />

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#8339FF",
                      width: width * 0.7,
                      padding: 10,
                      margin: 5,
                    },
                  ]}
                  onPress={handleAddSocial}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSocial("reddit")}>
                
                {isDelete ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.removeButtonText}>Remove</Text>
                  )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        );
      default:
        return null;
    }
  };

  const handleAddSocial = async () => {
    try {
      
      setIsLoading(true);
      const formData = new FormData();
      formData.append("website", website);
      formData.append("email", email);
      formData.append("link", link);
      formData.append("address", address);
      formData.append("whatsapp", whatsapp);
      formData.append("twitter", twitter);
      formData.append("linkedIn", linkedIn);
      formData.append("facebook", facebook);
      formData.append("tiktok", tiktok);
      formData.append("youtube", youtube);
      formData.append("instagram", instagram);
      formData.append("behance", behance);
      formData.append("discord", discord);
      formData.append("skype", skype);
      formData.append("telegram", telegram);
      formData.append("reddit", reddit);

      const response = await fetch(
        `https://bc.exploreanddo.com/api/add-socialmedia-links/${empId}`,
        // `https://bc.exploreanddo.com/api/add-socialmedia-links/5`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: `Social Fields Added Successfully`,
          position: "top",
          visibilityTime: 4000,
        });
        setSelectedItem(null);
        fetchSocialData();
        navigation.navigate("Admin Add Fields",{empId:empId});
      } else {
        console.error("Adding failed Status:", response.status);
        Toast.show({
          type: "error",
          text1: `Social Fields Adding Failed`,
          position: "top",
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      console.error("Social Fields Adding Failed", error);
      Toast.show({
        type: "error",
        text1: `Social Fields Adding Failed`,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const[isDelete, setIsDelete] = useState(false);
  const handleDeleteSocial = async (socialMedia) => {
    console.log("SocialMediaAdmin", socialMedia)
    try {
      setIsDelete(true);
      const response = await fetch(
        `https://bc.exploreanddo.com/api/delete-socialmedia-links/${empId}`,
        {
          method: "POST",
          body: JSON.stringify({ socialMedia }), 
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: `${socialMedia} Field Deleted Successfully`,
          position: "top",
          visibilityTime: 4000,
        });
        setSelectedItem(null);
        fetchSocialData();
        navigation.navigate("Add Fields");
      } else {
        console.error("Deletion failed Status:", response.status);
        Toast.show({
          type: "error",
          text1: `${socialMedia} Field Deletion Failed`,
          text2: `Try again in sometime later`,
          position: "top",
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      console.error("Social Fields Deletion Failed", error);
      Toast.show({
        type: "error",
        text1: `${socialMedia} Field Deletion Failed`,
        text2: `Try Again In Sometime`,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonBorder}
            onPress={() =>
              navigation.navigate("Admin Display", {
                empId: empId,
              })
            }
          >
            <Text style={styles.label}>Display</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBorder}
            onPress={() =>
              navigation.navigate("Admin Edit Info", {
                empId: empId,
              })
            }
          >
            <Text style={styles.label}>Edit Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Admin Add Fields", {
                empId: empId,
              })
            }
          >
            <LinearGradient
              colors={["white", "#8339FF"]}
              start={[1, 0]}
              end={[0, 1]}
              style={styles.button}
            >
              <Text style={styles.title}>Add Fields</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginBottom: "20%" }}>
          <View style={styles.popular}>
            <Text style={styles.inputLabelBold}>Most Popular</Text>
            <View
              style={[
                styles.row,
                {
                  elevation: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 15,
                  paddingHorizontal: Dimensions.get("window").width * 0.05,
                  paddingVertical: Dimensions.get("window").height * 0.01,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleItemClick("Website")}
              >
                <View style={styles.buttonContent}>
                  <MaterialCommunityIcons
                    name="web"
                    size={35}
                    color="#8339FF"
                    onPress={() => handleItemClick("Website")}
                  />
                  <Text style={styles.buttonText}>Website</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleItemClick("Email")}
              >
                <View style={styles.buttonContent}>
                  <MaterialIcons
                    name="alternate-email"
                    size={35}
                    color="#8339FF"
                    onPress={() => handleItemClick("Email")}
                  />
                  <Text>Email</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleItemClick("Link")}
              >
                <View style={styles.buttonContent}>
                  <MaterialCommunityIcons
                    name="link"
                    size={35}
                    color="#8339FF"
                    onPress={() => handleItemClick("Link")}
                  />
                  <Text>Link</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleItemClick("Address")}
              >
                <View style={styles.buttonContent}>
                  <MaterialCommunityIcons
                    name="google-maps"
                    size={35}
                    color="#8339FF"
                    onPress={() => handleItemClick("Address")}
                  />
                  <Text>Address</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.popular}>
            <Text style={styles.inputLabelBold}>Payments</Text>
            <View
              style={[
                styles.row,
                {
                  elevation: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 15,
                  paddingHorizontal: Dimensions.get("window").width * 0.05,
                  paddingVertical: Dimensions.get("window").height * 0.01,
                },
              ]}
            >
              <TouchableOpacity style={styles.buttonContainer}>
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../../../assets/social/icons8-paypal-48.png")}
                  />
                  <Text style={styles.buttonText}>PayPal</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}>
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../../../assets/social/icons8-apple-pay-48.png")}
                  />
                  <Text>ApplePay</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../../../assets/social/icons8-google-pay-48.png")}
                  />
                  <Text>GooglePay</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../../../assets/social/icons8-mastercard-48.png")}
                  />
                  <Text>MasterCard</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.popular}>
            <Text style={styles.inputLabelBold}>Add your Social Media</Text>
            <View
              style={[
                styles.row,
                {
                  elevation: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 15,
                  paddingHorizontal: Dimensions.get("window").width * 0.05,
                  paddingVertical: Dimensions.get("window").height * 0.01,
                },
              ]}
            >
              <View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("WhatsApp")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-whatsapp-48.png")}
                    />
                     {whatsapp && whatsapp !== "null" && ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>WhatsApp</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Tiktok")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-tiktok-48.png")}
                    />
                     {tiktok && tiktok !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>TikTok</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Discord")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-discord-48.png")}
                    />
                     {discord && discord !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>Discord</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Twitter")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-twitter-48.png")}
                    />
                     {twitter && twitter !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>Twitter</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("YouTube")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-youtube-48.png")}
                    />
                    {youtube && youtube !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>YouTube</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Skype")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-skype-48.png")}
                    />
                     {skype && skype !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>Skype</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("LinkedIn")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-linkedin-48.png")}
                    />
                    {linkedIn && linkedIn !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text style={styles.buttonText}>LinkedIn</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Instagram")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-instagram-48.png")}
                    />
                     {instagram && instagram !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>Instagram</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Telegram")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-telegram-48.png")}
                    />
                    {telegram && telegram !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>Telegram</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Facebook")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-facebook-48.png")}
                    />
                     {facebook && facebook !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text style={styles.buttonText}>Facebook</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Behance")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-behance-48.png")}
                    />
                     {behance && behance !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>Behance</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleItemClick("Reddit")}
                >
                  <View style={styles.buttonContent}>
                    <Image
                      source={require("../../../../assets/social/icons8-reddit-48.png")}
                    />
                     {reddit && reddit !== "null" &&  ( 
                      <View style={styles.verifiedIconContainer}>
                        <MaterialIcons
                          name="verified"
                          size={15}
                          color="blue"
                        />
                      </View>
                    )}
                    <Text>Reddit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <AdminFooter navigation={navigation} />
      {renderPopover()}
    </View>
  );
};



export default AdminAddFields;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    //marginTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#eee",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  popular: {
    borderRadius: 15,
    // elevation: 2,
  },
  inputLabelBold: {
    fontSize: Dimensions.get("window").height * 0.02,
    fontWeight: "bold",
    color: "#8339FF",
    marginVertical: 10,
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
  buttonBorder: {
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#8339FF",
    borderWidth: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonText: {
    marginTop: 5,
  },
  verifiedIconContainer: {
    position: "absolute",
    top: 0,
    right: -5,
    backgroundColor: "transparent",
  },
  popover: {
    position: "absolute",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1.5,
    borderColor: "#8339FF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  removeButtonText: {
    alignItems: "center",
    alignSelf: "center",
    color: "#8339FF",
    fontWeight: "bold",
  },
});
