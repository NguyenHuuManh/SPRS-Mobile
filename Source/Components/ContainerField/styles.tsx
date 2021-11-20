import { StyleSheet } from 'react-native';
// import { measure, padding } from '../../Helpers';
import { AppColor } from "../../Helper/propertyCSS"

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#e0dcce",
        marginTop: 20,
        borderRadius: 10,
        paddingRight: 1,
        paddingLeft: 1,
    },

    titleContainer: {
        position: "absolute",
        height: 20,
        flexWrap: "wrap",
        top: -10,
        left: 20,
        zIndex: 10
    },
    title: {
        backgroundColor: "#FFFF",
        paddingLeft: 10,
        paddingRight: 10,
        color: AppColor.CORLOR_TEXT

    }

});
