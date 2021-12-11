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
        fontSize: 25,
        color: AppColor.CORLOR_TEXT
    },

    inforView: {
        width: "95%",
        marginTop: 10,
        // backgroundColor: 'pink'
    },
    addressView: {
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#ececec',
        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: 'blue'
    },
    titleView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '10%'
    },
    titleText: {
        fontWeight: "bold", marginRight: 5
    },
    textDescription: {
        color: AppColor.CORLOR_TEXT,
        // backgroundColor: 'red',
        width: "90%",
        flexDirection: "row"
    },

    underLine: {
        // borderStyle: "solid",
        borderWidth: 0,
        // borderBottomWidth: 1,
        borderColor: AppColor.CORLOR_TEXT
    }

});
