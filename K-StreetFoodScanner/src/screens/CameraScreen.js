import { StyleSheet, View, Dimensions } from 'react-native';
import ImageButton from '../components/ImageButton'
import { useNavigation } from '@react-navigation/native';

const SearchImg = require("../../assets/search.png");
const windowWidth = Dimensions.get("window").width;

const CameraScreen = (props) => {
  
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', alignContent: 'center'}}>
        <View>
          <ImageButton 
            onPress={() =>{navigator.navigate("Info")}} 
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
    alignItems: "center",
    
  }
});

export default CameraScreen;