import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthProvider';
import RootScreen from './src/components/RootScreen';
import LandingScreen from './src/screens/LandingScreen';
import Login from './src/screens/UserScreens/Login';
import AdminLogin from './src/screens/AdminScreens/AdminLogin';
import Register from './src/screens/Register';
import ForgotPassword from './src/components/ForgotPassword';
import Signup from './src/screens/UserScreens/Signup';
import UserTheme1 from './src/drawers/User/UserThemed/UserTheme1';
import UserTheme2 from './src/drawers/User/UserThemed/UserTheme2';
import UserTheme3 from './src/drawers/User/UserThemed/UserTheme3';
import UserTheme4 from './src/drawers/User/UserThemed/UserTheme4';
import UserTheme5 from './src/drawers/User/UserThemed/UserTheme5';
import UserTheme6 from './src/drawers/User/UserThemed/UserTheme6';
import AdminHome from './src/drawers/Admin/AdminHome';
import AddUser from './src/drawers/Admin/AddUser';
import Branches from './src/drawers/Admin/Branches';
import EmpDetails from './src/drawers/Admin/EmpDetails';
import AdminDisplay from './src/drawers/Admin/AdminDisplay/AdminDisplay';
import AdminEditInfo from './src/drawers/Admin/AdminEditInfo/AdminEditInfo';
import AdminLayout from './src/drawers/Admin/AdminLayout/AdminLayout';
import AdminTheme1 from './src/drawers/Admin/AdminThemed/AdminTheme1';
import AdminTheme2 from './src/drawers/Admin/AdminThemed/AdminTheme2';
import AdminTheme3 from './src/drawers/Admin/AdminThemed/AdminTheme3';
import AdminTheme4 from './src/drawers/Admin/AdminThemed/AdminTheme4';
import AdminTheme5 from './src/drawers/Admin/AdminThemed/AdminTheme5';
import AdminTheme6 from './src/drawers/Admin/AdminThemed/AdminTheme6';
import Display from './src/drawers/User/Display/Display';
import EditInfo from './src/drawers/User/EditInfo/EditInfo';
import Layout from './src/drawers/User/Layouts/Layout';
import Contacts from './src/drawers/User/Contacts/Contacts';
import ContactDetails from './src/drawers/User/Contacts/ContactDetails';
import Settings from './src/drawers/User/Settings/Settings';
import Analytics from './src/drawers/User/Analytics/Analytics';
import Scanner from './src/drawers/User/Scans/Scanner';
import ShareProfile from './src/drawers/User/ShareProfile/ShareProfile';
import Feedback from './src/drawers/User/Supports/Feedback';
import ContactSupport from './src/drawers/User/Supports/ContactSupport';
import HelpCenter from './src/drawers/User/Supports/HelpCenter';
import PrivacyPolicy from './src/drawers/User/Supports/PrivacyPolicy';
import CheckUpdates from './src/drawers/User/Supports/CheckUpdates';
import Firstthing from './src/screens/UserScreens/Setup/Firstthing';
import EnterCardDetails from './src/screens/UserScreens/Setup/EnterCardDetails';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Root">
          <Stack.Screen name="Root" component={RootScreen} />
          <Stack.Screen name="Landing Screen" component={LandingScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Admin Login" component={AdminLogin} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Reset Password" component={ForgotPassword} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="UserTheme1" component={UserTheme1} />
          <Stack.Screen name="UserTheme2" component={UserTheme2} />
          <Stack.Screen name="UserTheme3" component={UserTheme3} />
          <Stack.Screen name="UserTheme4" component={UserTheme4} />
          <Stack.Screen name="UserTheme5" component={UserTheme5} />
          <Stack.Screen name="UserTheme6" component={UserTheme6} />
          <Stack.Screen name="Admin Home" component={AdminHome} />
          <Stack.Screen name="Add User" component={AddUser} />
          <Stack.Screen name="Branches" component={Branches} />
          <Stack.Screen name="Emp Details" component={EmpDetails} />
          <Stack.Screen name="Admin Display" component={AdminDisplay} />
          <Stack.Screen name="Admin Edit Info" component={AdminEditInfo} />
          <Stack.Screen name="Admin Layout" component={AdminLayout} />
          <Stack.Screen name="AdminTheme1" component={AdminTheme1} />
          <Stack.Screen name="AdminTheme2" component={AdminTheme2} />
          <Stack.Screen name="AdminTheme3" component={AdminTheme3} />
          <Stack.Screen name="AdminTheme4" component={AdminTheme4} />
          <Stack.Screen name="AdminTheme5" component={AdminTheme5} />
          <Stack.Screen name="AdminTheme6" component={AdminTheme6} />
          <Stack.Screen name="Display" component={Display} />
          <Stack.Screen name="Edit Info" component={EditInfo} />
          <Stack.Screen name="Layout" component={Layout} />
          <Stack.Screen name="Contacts" component={Contacts} />
          <Stack.Screen name="Contact Details" component={ContactDetails} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Analytics" component={Analytics} />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="Share Profile" component={ShareProfile} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Contact Support" component={ContactSupport} />
          <Stack.Screen name="Help Center" component={HelpCenter} />
          <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
          <Stack.Screen name="Check Updates" component={CheckUpdates} />
          <Stack.Screen name="First Thing" component={Firstthing} />
          <Stack.Screen name="Enter Card Details" component={EnterCardDetails} />
        </Stack.Navigator>
        <Toast />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}