import { StyleSheet } from 'react-native';
import { width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        borderColor: "#FFFF",
        borderWidth: 1,
        backgroundColor: "#FFFF",
        width: width*0.8,
        zIndex: 200,
        borderRadius:20,
    },
});
