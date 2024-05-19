import { StyleSheet, View, Image } from 'react-native';
import { useState } from 'react';
import ImageButton from '../components/ImageButton'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

const SearchImg = require("../../assets/search.png");
const pickImg =  require("../../assets/pick.png");

const CameraScreen = (props) => {
  
  const navigator = useNavigation();
  
  const [ImgScreen, setImgScreen] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.Btns}>
        <View style={styles.pickBtn}>
          <ImageButton
            onPress={() => {}}
            source={pickImg}
            width={70}
            height={70} />
        </View>
        <View style={styles.searchBtn}>
          <ImageButton 
            onPress={() => {navigator.navigate("Info")}} 
            source={SearchImg} 
            width={75}
            height={75} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtn:{
    alignContent: "space-evenly",
    marginBottom: "10%",
  },
  pickBtn:{
    alignContent: "space-evenly",
    marginBottom: "10%",
  },
  Btns:{
    flex: 1,
    justifyContent: 'flex-end',

  }
});

export default CameraScreen;