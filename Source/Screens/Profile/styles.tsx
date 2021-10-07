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
});
