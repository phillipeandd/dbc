import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity,Linking  } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from '@expo/vector-icons';
import Toast from "react-native-toast-message";

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Request camera permission
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  // Handle barcode scanned
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Redirect based on scanned QR code data
    Linking.openURL(data)
    .then(() => {
      console.log('URL opened successfully:', data);
      Toast.show({
        type: "success",
        text1: `Scanned QR Code Successfull`,
        text2: `Redirecting to QR Code Success`,
        position: "top",
        visibilityTime: 3000,
      });
    })
    .catch((error) => {
      console.error('Failed to open URL:', error);
      Toast.show({
        type: "error",
        text1: `Failed to scan QR Code`,
        text2: `: ${error.message}`,
        position: "top",
        visibilityTime: 3000,
      });
    });
    //navigation.navigate("Scanned Cards", { qrData: data });
    // console.log("data",data)
    // console.log("type",type)
  };


  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scanAgainButtonContainer}>
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgainButton}>
            <Ionicons name="ios-camera-reverse" size={24} color="white" />
            <Text style={styles.scanAgainText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  scanAgainButtonContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  scanAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanAgainText: {
    color: 'white',
    marginLeft: 10,
  }
});

export default Scanner;
