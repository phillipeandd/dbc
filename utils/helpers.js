import { Linking, Alert, Vibration } from 'react-native';
import Toast from 'react-native-toast-message';

export const openURL = async (url, errorMessage = 'Unable to open link') => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      showToast('error', errorMessage);
    }
  } catch (error) {
    console.error('Error opening URL:', error);
    showToast('error', errorMessage);
  }
};

export const showToast = (type, text1, text2 = '', position = 'top', visibilityTime = 4000) => {
  Toast.show({
    type,
    text1,
    text2,
    position,
    visibilityTime,
  });
};

export const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  Alert.alert(title, message, buttons);
};

export const triggerVibration = (pattern = [0, 100]) => {
  Vibration.vibrate(pattern);
};

export const formatDate = (date, format = 'dd-MMMM-yyyy') => {
  // You can use date-fns format function here
  return new Date(date).toLocaleDateString();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};