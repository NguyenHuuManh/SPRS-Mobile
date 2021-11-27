import { StyleSheet } from 'react-native';
import { AppColor } from '../../Helper/propertyCSS';
import { height } from '../../Helper/responsive';
// import { measure, padding } from '../../Helpers';

export default StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: AppColor.MAIN_COLOR,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 0,
        paddingTop: 0,
        zIndex: 20,
        flex: 1,
    },

});
