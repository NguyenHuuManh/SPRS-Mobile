import { StyleSheet } from 'react-native';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#FFF",
    },
    scrollContainer: {
        // height: height + (height * 0.1),
        width: width,
        // flex: 1,
        // alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    containMap: {
        width: "90%",
        height: 300,
        marginTop: 20,
        paddingLeft: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#FFF"
    }

});
