import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import * as Clipboard from 'expo-clipboard';


CameraScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
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
        const options = { quality: 0.5 }; // Adjust quality as needed (0-1)
        const data = await cameraRef.current.takePictureAsync(options);
        const base64Data = await new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', data.uri, true);
          xhr.responseType = 'blob';
          xhr.onload = function () {
            const reader = new FileReader();
            reader.onloadend = function () {
              resolve(btoa(reader.result));
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.send();
        });
        
        // (Optional) Handle or store the base64 data as needed
        Clipboard.setStringAsync(base64Data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Icon name="camera-rotate" size={50} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Icon name="camera" size={50} />
          </TouchableOpacity>
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
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

export default CameraScreen;