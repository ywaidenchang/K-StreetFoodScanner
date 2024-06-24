import { Image, Text, StyleSheet } from 'react-native';
import SimpleAccordion from 'react-native-simple-accordion';
import DescriptionAccordionView from "../components/DescriptionAccordionView";
import { useRoute } from "@react-navigation/native"

const InfoScreen = () => {
  const route = useRoute();
  const name = route.params.name;

  return (
    <>
      <Image/>
      <Text style={styles.title}>{name ? name.replace(/\"/gi, "") : "NO FOOD DETECTED"}</Text>
      <SimpleAccordion 
        viewInside={<Text></Text>}    //<DescriptionAccordionView />
        title={"Description"} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
});

export default InfoScreen;
