import React, { useEffect } from "react";
import { View } from "react-native";
import Toast from 'react-native-toast-message';

interface Props {
    toastProps: {
        visible: boolean,
        message: string,
        position?: "top" | "bottom",
        type?: "success" | "error"
    }
}
export default (props: Props) => {
    const { toastProps } = props
    const { message, visible, position, type } = toastProps
    useEffect(() => {
        console.log("visible", visible);
        if (visible) {
            Toast.show({
                type: type,
                text1: message,
                position: position ? position : "top"
            })
        }
    }, [toastProps])
    return (
        <Toast
            ref={(ref) => Toast.setRef(ref)}
            autoHide
        />

    )
}