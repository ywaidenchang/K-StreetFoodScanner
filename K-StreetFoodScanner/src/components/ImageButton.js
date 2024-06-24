import { Image, TouchableOpacity } from 'react-native';

const ImageButton = ({onPress, source, width, height, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
      source={source}
      style={[{width: width, height: height}, style]} />
    </TouchableOpacity>
  );
};

export default ImageButton;