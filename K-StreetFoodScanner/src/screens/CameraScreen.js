import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from "../components/IconButton";
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [status, requestPhotoPermission] = ImagePicker.useMediaLibraryPermissions();
  const cameraRef = useRef(null);
  const navigation = useNavigation();

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    
    let base64Data = result.assets[0].base64
    navigation.navigate("Info", {data: base64Data})
  };  
  
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 1, base64: true };   // Quality: 0~1
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
          <IconButton iconName="images" size={40} onPress={pickImage} />
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
