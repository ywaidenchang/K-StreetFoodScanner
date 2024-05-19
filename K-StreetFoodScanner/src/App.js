import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from './Stacks';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stacks />
    </NavigationContainer>
  );
};

export default App;