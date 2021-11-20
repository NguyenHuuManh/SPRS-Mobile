import { StyleSheet } from 'react-native';
import { AppColor } from '../../Helper/propertyCSS';
import { height } from '../../Helper/responsive';
// import { measure, padding } from '../../Helpers';

export default StyleSheet.create({
    containerInput: {
        width: "100%",
        // backgroundColor: "blue",
        justifyContent: "space-around",
        // borderBottomWidth: 0.5,
    },
    inputContainer: {
        height: 50,
        paddingHorizontal: 10,
        lineHeight: 30,
        borderRadius: 10,
        flex: 9,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    underLine: {
        borderBottomWidth: 0.5,
    },

    input: {
        flex: 10,
        color: AppColor.CORLOR_TEXT,
        flexWrap: "wrap",
        overflow: "scroll",
    },

    iconRight: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },


    icon: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",

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

    containMap: {
        width: "90%",
        height: "70%",
        marginTop: 20,
        paddingLeft: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#FFF"
    }

});
