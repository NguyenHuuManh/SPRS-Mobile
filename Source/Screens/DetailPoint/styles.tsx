import { StyleSheet } from 'react-native';
import { AppColor } from '../../Helper/propertyCSS';
import { height, width } from '../../Helper/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#FFF",
    },
    scrollContainer: {
        height: height,
        width: width,
        alignItems: "center",
        justifyContent: "flex-start",
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

    headerPoint: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    textHeader: {
        fontWeight: "bold",
        fontSize: 25
    },

    inforView: {
        width: "95%",
        // backgroundColor: "pink"
    },
    addressView: {
        // flexDirection: "row",
        marginTop: 10
    },
    titleView: {
        flexDirection: "row"
    },
    titleText: {
        fontWeight: "bold", marginRight: 5
    },
    textDescription: {
        color: AppColor.CORLOR_TEXT,
    },

    underLine: {
        borderStyle: "solid",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: AppColor.CORLOR_TEXT
    }

});
