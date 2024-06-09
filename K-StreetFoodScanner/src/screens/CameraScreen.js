import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [roboflowResult, setRoboflowResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
        const options = { quality: 0.8, base64: true }; // Adjust quality as needed (0-1)
        const data = await cameraRef.current.takePictureAsync(options);
        const base64Data = data.base64;

        sendRoboflowRequest(base64Data);
        navigation.navigate("Info", {data: roboflowResult});

      } catch (error) {
        console.error(error);
      }
    }
  };

  function sendRoboflowRequest(data) {
    axios({
      method: "POST",
      url: "https://detect.roboflow.com/k-street-food-scanner/11",
      params: {
        api_key: "Xk1dBd1GnSB7NsJsI2fF"
      },
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(function(response) {
      let result = response.data.predictions;
      console.log(result);

      setRoboflowResult(JSON.stringify(result));      
    })
    .catch(function(error) {
      let errorMsg = error.message;
      console.log(errorMsg);

      setErrorMsg("Error Ocurred\nError Message: " + errorMsg);
    });
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
          <TouchableOpacity>
            <Icon name="images" />
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