import { StyleSheet } from 'react-native';
import { height, width } from '../../../Helper/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingTop: "10%"
    },

    header: {
        width: "90%",
        height: height * 0.2,
        flexDirection: "row",
        paddingTop: "10%"
    },
    contents: {
        width: "90%",
        height: height * 0.7,
    }


});
