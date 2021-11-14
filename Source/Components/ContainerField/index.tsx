import React from "react";
import { Text, View } from "react-native";
import styles from "./styles"
interface Props {
    title?: string;
    children?: any;
    disabled?: boolean
    styleCustomContainer?: any;

}
export default (props: Props) => {
    const { title, children, disabled, styleCustomContainer } = props
    return (
        <View style={[styles.container, styleCustomContainer]} pointerEvents={disabled ? "none" : "auto"}>
            {title && (
                <View style={[styles.titleContainer]}><Text style={[styles.title]}>{title}</Text></View>
            )}
            {children}
        </View>
    )
}