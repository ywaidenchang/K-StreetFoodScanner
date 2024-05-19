import { Image, Pressable } from 'react-native';

const ImageButton = ({onPress, source, width, height, style}) => {
  return (
    <Pressable onPress={onPress}>
      <Image
      source={source}
      style={[{width: width, height: height}, style]} />
    </Pressable>
  );
};

export default ImageButton;