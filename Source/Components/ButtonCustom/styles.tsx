import { StyleSheet } from 'react-native';
import { width } from '../../Helper/responsive';
// import { measure, padding } from '../../Helpers';

export default StyleSheet.create({
    TouchableOpacity: {
        padding: 7,
        backgroundColor: "#d0d4cb",
        borderRadius: 10,
        marginTop: 5,
        justifyContent: "center",
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: "row",

    },
    Text: {
        alignSelf: "center",
        fontSize: 20,
        color: "#FFFF",
        textAlign: "center",
    }
});
