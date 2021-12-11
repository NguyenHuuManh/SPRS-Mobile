import { StyleSheet } from 'react-native';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor:"pink",
    },
    scrollContainer: {
        height: height,
        width: width,
        // alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 10,
        paddingRight: 10
    },
    containMap: {
        width: "90%",
        height: 300,
        marginTop: 20,
        paddingLeft: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#FFF"
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
