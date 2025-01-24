// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// const Test = () => {
//   const [nfcData, setNfcData] = useState(null);
//   useEffect(() => {
//     NfcManager.start();
//     return () => {
//       NfcManager.stop();
//     };
//   }, []);
//   const startNfcListener = async () => {
//     try {
//       await NfcManager.requestTechnology(NfcTech.Ndef);
//     //   NfcManager.registerTagEvent();
//       NfcManager.setEventListener(NfcTech.Ndef, (tag) => {
//         console.log('NFC Tag:', tag);
//         setNfcData(tag);
//         NfcManager.setAlertMessageIOS('NFC Tag Detected');
//         NfcManager.unregisterTagEvent().catch(() => 0);
//       });
//       NfcManager.setAlertMessageIOS('Aproxime o NFC Tag do dispositivo.');
//     } catch (ex) {
//       console.warn(ex);
//     }
//   };
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>NFC Data: {nfcData}</Text>
//       <TouchableOpacity onPress={startNfcListener} style={{ marginTop: 20 }}>
//         <Text>Start NFC Reader</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Test;
