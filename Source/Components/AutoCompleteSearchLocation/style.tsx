import { StyleSheet } from 'react-native';
import { width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        width: "100%",
        zIndex: 200,
        height: "100%"
    },
    inputContainer: {
        borderColor: "#FFFF",
        borderWidth: 1,
        backgroundColor: "#FFFF",
        borderRadius: 10,
        height: 50
    },

    input: {
        // backgroundColor: "red"
    },

    listItemContainer: {
        backgroundColor: "#FFFF",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 5,
        marginTop: 10,
        maxHeight: 230,
    },
    item: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        minHeight: 50,
        // backgroundColor: "red",
        // borderWidth: 1
    }


});
