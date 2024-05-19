import { Image, Pressable } from 'react-native';

const ImageButton = ({onPress, source, width, height}) => {
  return (
    <Pressable onPress={onPress}>
      <Image
      source={source}
      style={{width: width, height: height}} />
    </Pressable>
  );
};

export default ImageButton;