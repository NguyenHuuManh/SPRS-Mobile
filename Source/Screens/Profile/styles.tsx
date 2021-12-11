import { StyleSheet } from 'react-native';
import { AppColor } from '../../Helper/propertyCSS';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    containerInfor: {
        width: "100%",
        height: "80%",
        backgroundColor: "#FFFF",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 10,
        alignItems: "center"
    },
    avata: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "#FFFF",
        marginBottom: -50
    },

    boxShadowAvata: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
    },
    rowItem: {
        width: "100%",
        height: 60,
        borderBottomWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    touchItem: {
        paddingLeft: 20,
        paddingRight: 5,
        justifyContent: "space-around",
        flexDirection: "row",
        height: "100%"
    },
    containerIcon: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    pickerImg: {
        position: "absolute",
        bottom: 50,
        right: 30,
        zIndex: 100,
        backgroundColor: '#A0A6BE',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }


});
