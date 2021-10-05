import { StyleSheet } from 'react-native';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        width: width,
        height: height * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containLogin: {
        width: width * 0.9,
        backgroundColor: "#FFFF",
        borderRadius: 20,
        padding: "5%",
        paddingBottom: "5%",
        marginBottom: "30%",
        marginTop: "20%",
    },
    BG: {
        height: height,
        width: "100%",
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
    }
});
