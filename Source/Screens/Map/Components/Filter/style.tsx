import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        width: 50,
        zIndex: 10,
        position: "absolute",
        top: 100,
        left: 5,
        margin: 10,
        // backgroundColor: "blue"
    },

    item: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: "red",
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFFF",
    },
});
