import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    text: {
        color: "red",
        fontWeight: 'bold',
        // fontSize: wp('3%'),
        // padding: wp('3%'),
        paddingTop: 0,
    },

    selectContain: {
        flex: 12,
        alignItems: "center"
    },
    textContent: {
        color: "red",
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "blue"
    },
    btnClear: {
        padding: 5,
        // backgroundColor: "red",
        flex: 1
    },

    containter: {
        padding: 5,
        borderWidth: 1,
        borderColor: "#FFF",
        alignItems: "center",
        borderRadius: 5,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#FFF"
    }


});

export default styles;
