import { StyleSheet } from 'react-native';
// import { measure, padding } from '../../Helpers';

export default StyleSheet.create({
    containerInput: {
        width: "100%",
        // backgroundColor: "blue",
        justifyContent: "space-around"
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        lineHeight: 30,
        fontSize: 18,
        borderRadius: 10,
        flex: 9,
        justifyContent: "center"
        // backgroundColor: "pink"
    },
    underLine: {
        borderBottomWidth: 0.5,
    },
    icon: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"pink"

    },
    text: {
        height: 30,
    },
    textHorizontal: {
        // backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center"
    },
    containText: {
        height: 50,
        // backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center",
        marginLeft: 5,
        marginRight: 5
    },

});
