import { StyleSheet } from 'react-native';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        flex: 1
    },

    item: {
        borderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 1,
        height: 100,
        borderColor: 'rgba(0,0,0,0.2)',
        flexDirection: "row",
        padding: 10
    }

});
