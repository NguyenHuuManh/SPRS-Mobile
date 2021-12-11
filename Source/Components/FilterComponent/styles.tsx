import { StyleSheet } from 'react-native';
import { AppColor } from '../../Helper/propertyCSS';
import { height } from '../../Helper/responsive';
// import { measure, padding } from '../../Helpers';

export default StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "#FFFF"
    },
    containerModal: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(60, 60, 60,0.3)'
    },
    containerContent: {
        width: "90%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red"
    },

    content: {
        width: "90%",
        height: "40%",
        backgroundColor: AppColor.BUTTON_MAIN,
        borderRadius: 10,
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: "center",

    },
    containerBottom: {
        height: "15%",
        width: "100%",
        alignItems: "center",
        marginBottom: 30,
        flexDirection: "row-reverse",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    containerChild: {
        width: "100%",
        height: "90%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFF"
    },
    containerColumn: {
        width: "50%",
        borderStyle: 'solid',
        borderWidth: 0,
        borderColor: "#edf0ee"
    },
    headerColumn: {
        height: "10%",
        alignItems: "center",
        backgroundColor: AppColor.BUTTON_MAIN,
        // backgroundColor: 'red'
    },
    buttonComfirm: {
        padding: 10, marginRight: 20
    },
    buttonCancel: {
        padding: 10, marginRight: 20
    },
    btnRadius: {
        width: 20,
        height: 20,
        borderRadius: 20,
        // marginRight: 10,
        borderStyle: "solid",
        // borderWidth: 1,
        borderColor: "gray",
    },
    btnContainRadius: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "gray",
    }

});
