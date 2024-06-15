import { StyleSheet, Image } from 'react-native';
import SimpleAccordion from 'react-native-simple-accordion';
import DescriptionAccordionView from "../components/DescriptionAccordionView";

const InfoScreen = (route) => {
  const { data } = route.params;
  return (
    <>
      <Image/>
      <SimpleAccordion 
        viewInside={<DescriptionAccordionView />}
        title={"Description"} />
    </>
  );
};

export default InfoScreen;