import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from "../components/IconButton";

const CameraScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultName, setResultName] = useState(null);


  if (!permission) {
    return (
      <View />
    );
  }

  if (!permission.granted) {
    requestPermission();
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.8, base64: true };   // Quality: 0~1
        const data = await cameraRef.current.takePictureAsync(options);
        const base64Data = data.base64;

        navigation.navigate("Info", {data:base64Data});
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <IconButton iconName="camera-rotate" size={40} onPress={toggleCameraFacing} />
          <IconButton iconName="camera" size={50} onPress={takePicture} />
          <IconButton iconName="images" size={40} onPress={() => {console.log("응")}} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
});

export default CameraScreen;
