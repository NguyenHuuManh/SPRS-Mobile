import { StyleSheet } from 'react-native';
import { height } from '../../Helper/responsive';
// import { measure, padding } from '../../Helpers';

export default StyleSheet.create({
    containerInput: {
        width: "100%",
        // backgroundColor: "blue",
        justifyContent: "space-around",
        // borderBottomWidth: 0.5,
    },
    inputContainer: {
        height: 50,
        paddingHorizontal: 10,
        lineHeight: 30,
        borderBottomWidth: 0.5,
        // fontSize: 18,
        borderRadius: 10,
        flex: 9,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "pink",
    },

    input: {
        flex: 10,
        color: "red",
        flexWrap: "wrap",
        overflow: "scroll"
    },

    iconRight: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },


    icon: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"pink"

    },
    text: {
        height: 30,
    },
    textHorizontal: {
        // backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center"
    },
    containText: {
        height: 50,
        // backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center",
        marginLeft: 5,
        marginRight: 5
    },

    containMap: {
        width: "90%",
        height: "70%",
        marginTop: 20,
        paddingLeft: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#FFF"
    }

});
