import { StyleSheet } from 'react-native';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: "25%",
        marginBottom: "10%"
    },
    containLogin: {
        width: width * 0.8,
        backgroundColor: "#FFFF",
        borderRadius: 20,
        padding: "5%",
        paddingBottom: "5%",
        paddingTop: "0%",
        marginBottom:"5%"
    },
    BG: {
        height: height,
        width: "100%",
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
    }
});
