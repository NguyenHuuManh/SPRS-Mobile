import { StyleSheet } from 'react-native';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        width: width,
        height: height,
        // marginTop: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        // backgroundColor: "#FFFF"
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
    box: {
        width: "90%",
        backgroundColor: "#FFF",
        height: "90%",
        borderRadius: 10,
    },
    boxTouch: {
        width: "100%",
        backgroundColor: "#FFF",
        height: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    statusIcon: {
        width: 10,
        height: 10,
        borderRadius: 10,
    }

});
