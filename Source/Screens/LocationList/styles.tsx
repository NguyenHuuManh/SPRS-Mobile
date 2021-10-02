import { StyleSheet } from 'react-native';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        width: width,
        height: height,
        // marginTop: 10,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    item: {
        width: width * 0.9,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFFF",
        minWidth: width * 0.9
    },
});
