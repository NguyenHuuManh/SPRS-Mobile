import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    inputContent: {
        color: "black",
        lineHeight: 20,
        height: 40,
        width: "90%"
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
        borderRadius: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#FFF"
    },

    containerContent: { marginTop: 70, backgroundColor: "#FFF", },

    containerInput: {
        borderWidth: 1,
        borderColor: "#F6BB57",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingRight: 20,
    },
    headerContent: {
        marginTop: 10,
        // backgroundColor: "red",
    },
    Modal: {
        backgroundColor: '#FFF',
        // maxHeight: "50%",
        marginTop: 10,
    }
});

export default styles;
