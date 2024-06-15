import { Image, Text } from 'react-native';
import SimpleAccordion from 'react-native-simple-accordion';
import DescriptionAccordionView from "../components/DescriptionAccordionView";
import { useRoute } from "@react-navigation/native"

const InfoScreen = () => {
  const route = useRoute();
  const data = route.params.data;

  return (
    <>
      <Image/>
      <SimpleAccordion 
        viewInside={<Text>{data}</Text>}    //<DescriptionAccordionView />
        title={"Description"} />
    </>
  );
};

export default InfoScreen;