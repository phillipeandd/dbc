import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Share, Vibration } from "react-native";

/**
 * Authentication context for managing user authentication state
 * and related functionality across the app
 */
const AuthContext = createContext();

/**
 * Hook to access authentication context
 * @returns {Object} Authentication context value
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Authentication provider component that manages user state,
 * login/logout functionality, and user preferences
 */
export function AuthProvider({ children }) {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Business information state
  const [business_name, setBuisnessName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState("");
  const [userImage, setUserImage] = useState("");
  
  // Business form handlers
  const handleBuisnessChange = (text) => {
    setBuisnessName(text);
  };
  
  const handleWebsiteChange = (text) => {
    setWebsite(text);
  };
  
  const handleBuisnessEmailChange = (text) => {
    setEmail(text);
  };

  const handleBuisnessPhoneChange = (text) => {
    setPhone(text);
  };
  
  const handleCompanyChange = (text) => {
    setCompanyName(text);
  };
  
  const handleTitleChange = (text) => {
    setTitle(text);
  };

  // Admin authentication state
  const [adminauthenticated, setadminAuthenticated] = useState(false);
  const [adminloggedInUser, setadminLoggedInUser] = useState(null);
  const [adminloginData, setadminLoginData] = useState({
    email: "",
    password: "",
  });

  // Error state
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [isadminInvalidCredentials, setIsadminInvalidCredentials] =
    useState(false);
  // Login form handlers

  const handleEmailChange = (text) => {
    setLoginData({
      ...loginData,
      email: text,
    });
  };

  const handlePasswordChange = (text) => {
    setLoginData({
      ...loginData,
      password: text,
    });
  };

  // Admin login form handlers
  const handleadminEmailChange = (text) => {
    setadminLoginData({
      ...adminloginData,
      email: text,
    });
  };

  const handleadminPasswordChange = (text) => {
    setadminLoginData({
      ...adminloginData,
      password: text,
    });
  };

  // User session state
  const [token, setToken] = useState(null);
  const [roleOf, setRoleOf] = useState(null);
  const [userId, setUsersId] = useState(null);
  const [themeIds, setThemeId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [showEmail, setShowEmail] = useState(null);
  const [showImage, setShowImage] = useState(null);

  /**
   * Navigate user to appropriate theme screen based on theme ID
   * @param {string} themeId - The theme ID to navigate to
   * @param {Object} navigation - Navigation object
   */
  const navigateToTheme = useCallback((themeId, navigation) => {
    const themeScreens = {
      "1": "UserTheme1",
      "2": "UserTheme2", 
      "3": "UserTheme3",
      "4": "UserTheme4",
      "5": "UserTheme5",
      "6": "UserTheme6",
    };
    
    const screenName = themeScreens[themeId] || "UserTheme1";
    navigation.navigate(screenName);
  }, []);

  /**
   * Handle user login with improved error handling
   */
  const handleLogin2 = async (navigation) => {
    try {
      setIsLoginLoading(true);
      const response = await fetch("https://bc.exploreanddo.com/api/loginAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        const data = await response.json();
        setLoggedInUser(data.data);
        setRoleOf(data.data.role_id);
        setUsersId(data.data.id);
        setThemeId(data.data.theme_id);
        setFirstName(data.data.firstname);
        setShowEmail(data.data.email);
        setShowImage(data.data.userImage);
        
        if (data.token) {
          setToken(data.token);
          setAuthenticated(true);
          
          if (data.isFirstLogin) {
            navigation.navigate("First Thing");
          } else {
            navigateToTheme(data.data.theme_id, navigation);
          }
          
          Toast.show({
            type: "success",
            text1: `Welcome Back ${data.data.firstname}`,
            text2: `Logged In Successfully`,
            position: "top",
            visibilityTime: 4000,
          });
          
          setLoginData({
            ...loginData,
            email: "",
            password: "",
          });
        } else {
          Toast.show({
            type: "error",
            text1: `Login Failed`,
            text2: `Invalid Credentials`,
            position: "top",
            visibilityTime: 4000,
          });
          setIsInvalidCredentials(true);
          setLoginData({
            ...loginData,
            email: "",
            password: "",
          });
        }
      } else if (!response.success) {
        Toast.show({
          type: "error",
          text1: `Login Failed`,
          text2: `Invalid Credentials`,
          position: "top",
          visibilityTime: 4000,
        });
      } else {
        setIsInvalidCredentials(true);
        setLoginData({
          ...loginData,
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Network error occurred",
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  /**
   * Main login handler with improved error handling and validation
   */
  const handleLogin = async (navigation) => {
    try {
      setIsLoginLoading(true);
  
      const response = await fetch("https://bc.exploreanddo.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.status === 200 ) {
        const data = await response.json();
        setLoggedInUser(data.data);
        setRoleOf(data.data.role_id);
        setUsersId(data.data.id);
        setThemeId(data.data.theme_id);
        setFirstName(data.data.firstname);
        setShowEmail(data.data.email);
        setShowImage(data.data.userImage);
        
        if (data.token) {
          setToken(data.token);
          setAuthenticated(true);
  
          if (data.isFirstLogin) {
            navigation.navigate("First Thing");
          } else {
            navigateToTheme(data.data.theme_id, navigation);
          }
  
          Toast.show({
            type: "success",
            text1: `Welcome Back ${data.data.firstname}`,
            text2: `Logged In Successfully`,
            position: "top",
            visibilityTime: 4000,
          });
  
          setLoginData({ ...loginData, email: "", password: "" });
        } else {
          Toast.show({
            type: "error",
            text1: `Login Failed`,
            text2: `Invalid Credentials`,
            position: "top",
            visibilityTime: 4000,
          });
          setIsInvalidCredentials(true);
          setLoginData({
            ...loginData,
            email: "",
            password: "",
          });
        }
      } else if (response.status === 401) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Invalid Credentials",
          position: "top",
          visibilityTime: 4000,
        });
        setIsInvalidCredentials(true);
      } else {
        const textResponse = await response.text();
        console.error("Unexpected Response:", textResponse);
  
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Unexpected Error Occurred",
          position: "top",
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
  
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  /**
   * Handle admin login with validation and error handling
   */
  const handleAdminLogin = async (navigation) => {
    if (
      adminloginData.email.trim() === "" ||
      adminloginData.password.trim() === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
        text2: "Please provide correct credentials",
        position: "top",
        visibilityTime: 3000,
      });
      setIsadminInvalidCredentials(true);
      return;
    }

    try {
      setIsLoginLoading(true);
      const response = await fetch("https://bc.exploreanddo.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminloginData),
      });

      if (response.status === 200) {
        const data = await response.json();
        setadminLoggedInUser(data.data);
        setRoleOf(data.data.role_id);
        setUsersId(data.data.id);
        setFirstName(data.data.firstname);
        setShowEmail(data.data.email);
        setShowImage(data.data.userImage);
        
        if (data.token) {
          setToken(data.token);
          setadminAuthenticated(true);
          navigation.navigate("Admin Home");
          Toast.show({
            type: "success",
            text1: `Welcome Back ${data.data.firstname}`,
            text2: `Company Logged In Successfull`,
            position: "top",
            visibilityTime: 3000,
          });
          setadminLoginData({
            ...adminloginData,
            email: "",
            password: "",
          });
        } else {
          Toast.show({
            type: "error",
            text1: `Login Failed`,
            text2: `Invalid Credentials`,
            position: "top",
            visibilityTime: 3000,
          });
          setIsadminInvalidCredentials(true);
          setadminLoginData({
            ...adminloginData,
            email: "",
            password: "",
          });
        }
      } else if (!response.success) {
        Toast.show({
          type: "error",
          text1: `Login Failed`,
          text2: `Server error. Please try again later.`,
          position: "top",
          visibilityTime: 3000,
        });
      } else {
        setIsadminInvalidCredentials(true);
        Toast.show({
          type: "error",
          text1: `Login Failed`,
          text2: `Please check your credentials`,
          position: "top",
          visibilityTime: 3000,
        });
        setadminLoginData({
          ...adminloginData,
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: `Login Failed`,
        text2: `Invalid Credentials`,
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  // Notification state
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  /**
   * Handle user logout and clear session data
   */
  const userLogout = async () => {
    try {
      setToken(null);
      setRoleOf(null);
      setAuthenticated(false);
      setLoggedInUser(null);
      setUsersId(null);
      setFirstName(null);
      setShowEmail(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  /**
   * Handle company/admin logout and clear session data
   */
  const companyLogout = async () => {
    try {
      setToken(null);
      setRoleOf(null);
      setadminAuthenticated(false);
      setadminLoggedInUser(null);
      setUsersId(null);
      setFirstName(null);
      setShowEmail(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Vibration settings
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  const handleVibrationToggle = (value) => {
    setVibrationEnabled(value);
  };

  const handleClickVibration = () => {
    if (vibrationEnabled) {
      Vibration.vibrate();
    }
  };

  /**
   * Handle profile sharing via native share API
   */
  const handleShareProfile = async () => {
    handleClickVibration();
    try {
      const message = `Hello, connect with me here! on this link https://bc.exploreanddo.com/get-web-nfc-user/${userId}`;
      await Share.share({
        message: message,
        title: "Share Profile",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // User data state
  const [seeUser, setSeeUser] = useState("");
  
  /**
   * Fetch user company details with automatic refresh
   */
  const fetchData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-company-details/${userId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSeeUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Social media data state
  const [social, setSocial] = useState("");
  
  /**
   * Fetch social media links for the user
   */
  const fetchSocialData = useCallback(() => {
    const apiUrl = `https://bc.exploreanddo.com/api/get-socialmedia-links/${userId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setSocial(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  useEffect(() => {
    fetchSocialData();
  }, [fetchSocialData]);

  // Context value object
  const value = {
    vibrationEnabled,
    setVibrationEnabled,
    handleVibrationToggle,
    handleClickVibration,
    authenticated,
    setAuthenticated,
    userLogout,
    companyLogout,
    loginData,
    setLoginData,
    isInvalidCredentials,
    setIsInvalidCredentials,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    loggedInUser,
    setLoggedInUser,
    adminauthenticated,
    setadminAuthenticated,
    adminloggedInUser,
    setadminLoggedInUser,
    adminloginData,
    setadminLoginData,
    isadminInvalidCredentials,
    setIsadminInvalidCredentials,
    handleadminEmailChange,
    handleadminPasswordChange,
    handleAdminLogin,
    notifications,
    addNotification,
    clearNotifications,
    isLoginLoading,
    setIsLoginLoading,
    token,
    roleOf,
    firstName,
    showEmail,
    showImage,
    setShowImage,
    business_name,
    setBuisnessName,
    email,
    setEmail,
    phone,
    setPhone,
    company_name,
    setCompanyName,
    title,
    setTitle,
    logo,
    setLogo,
    userImage,
    setUserImage,
    website,
    setWebsite,
    handleBuisnessChange,
    handleWebsiteChange,
    handleBuisnessEmailChange,
    handleBuisnessPhoneChange,
    handleCompanyChange,
    handleTitleChange,
    userId,
    themeIds,
    handleShareProfile,
    seeUser,
    setSeeUser,
    social,
    setSocial,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
