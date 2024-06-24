import { Image, Text, StyleSheet, View } from 'react-native';
import SimpleAccordion from 'react-native-simple-accordion';
import DescriptionAccordionView from "../components/DescriptionAccordionView";
import { useRoute } from "@react-navigation/native"

const InfoScreen = () => {
  const route = useRoute();
  const name = route.params.name;

  return (
    <>
      <Image/>
      <View style={styles.container}>
        <Text style={styles.title}>{name=="null" ? "NO FOOD DETECTED" :  name.replace(/\"/gi, "")}</Text>
      </View>
      <SimpleAccordion 
        viewInside={<Text></Text>}    //<DescriptionAccordionView />
        title={"Description"} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust background color as needed
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
});

export default InfoScreen;
