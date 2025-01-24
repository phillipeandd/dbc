
import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

const CustomStyledText = ({ text, fontName, fontSize ,color,fontWeight}) => {
  const [fontsLoaded] = useFonts({
    [fontName]: require('../../assets/fonts/RougeScript-Regular.ttf'), // Use the provided fontName
    // [fontName]: require('../../assets/fonts/YoungSerif-Regular.ttf'),
    // [fontName]: require('../../assets/fonts/AutourOne-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={{ fontFamily: fontName, fontSize ,color, fontWeight}}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomStyledText;
