import { StyleSheet, Image } from 'react-native';
import SimpleAccordion from 'react-native-simple-accordion';
import DescriptionAccordionView from "../components/DescriptionAccordionView";

const InfoScreen = (route) => {
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