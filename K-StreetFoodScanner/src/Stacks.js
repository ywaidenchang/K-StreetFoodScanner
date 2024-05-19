import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';
import InfoScreen from './screens/InfoScreen';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Camera" component={CameraScreen} options={{headerShown: false}} />
      <Stack.Screen name="Info" component={InfoScreen} options={{headerTitleAlign: 'center'}} />
    </Stack.Navigator>
  );
};

export default Stacks;