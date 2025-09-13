import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthProvider';
import RootScreen from './src/components/RootScreen';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <View style={styles.container}>
          <RootScreen />
          <StatusBar style="auto" />
        </View>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});