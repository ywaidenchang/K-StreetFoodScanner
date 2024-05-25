import { StyleSheet, Image } from 'react-native';
import SimpleAccordion from 'react-native-simple-accordion';
import DescriptionAccordionView from "../components/DescriptionAccordionView";

const InfoScreen = () => {
  return (
    <>
      <Image/>
      <SimpleAccordion 
        viewInside={<DescriptionAccordionView value="" />}
        title={"Description"} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InfoScreen;