import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';

const IconButton = ( props ) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Icon name={props.iconName} size={props.size} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
})

export default IconButton;