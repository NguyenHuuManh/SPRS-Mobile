import { StyleSheet } from 'react-native';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor:"pink",
        paddingTop: "10%"
    },
    containLogin: {
        width: width * 0.8,
        backgroundColor: "#FFFF",
        borderRadius: 10,
        padding: 20,
        // marginTop:"10%"
    },
    BG: {
        height: '100%',
        width: "100%",
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
    }

});
