import { Image, Text } from 'react-native';
import SimpleAccordion from 'react-native-simple-accordion';
import DescriptionAccordionView from "../components/DescriptionAccordionView";
import { useRoute } from "@react-navigation/native"

const InfoScreen = () => {
  const route = useRoute();
  const name = route.params.name;

  return (
    <>
      <Image/>
      <Text>{name==null ? "NO FOOD DETECTED" : name}</Text>
      <SimpleAccordion 
        viewInside={<Text></Text>}    //<DescriptionAccordionView />
        title={"Description"} />
    </>
  );
};

export default InfoScreen;