import { StyleSheet } from 'react-native';
// import { measure, padding } from '../../Helpers';

export default StyleSheet.create({
    containerInput: {
        width: "100%",
        // backgroundColor: "blue",
        justifyContent: "space-around",
        // opacity: 0.5
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        lineHeight: 30,
        borderBottomWidth: 0.5,
        borderRadius: 10,
        flex: 9,
        flexDirection: "row",
        alignItems: "center"
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
