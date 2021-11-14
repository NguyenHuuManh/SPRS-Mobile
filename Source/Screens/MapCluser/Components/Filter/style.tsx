import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        zIndex: 50,
        position: "absolute",
        top: 10,
        flexWrap: "wrap",
    },

    item: {
        width: 100,
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
