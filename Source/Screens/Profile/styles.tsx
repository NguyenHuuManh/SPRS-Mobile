import { StyleSheet } from 'react-native';
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
        width: 150,
        height: 150,
        borderRadius: 150,
        backgroundColor: "#FFFF",
        marginTop: 5
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
    }

});
