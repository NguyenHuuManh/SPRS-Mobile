import React, { useCallback } from "react";
import { Text, TextInput, View } from "react-native";
import { ViewStyle } from "react-native";
import styles from "./styles";
interface Props {
    // name: any;
    form?: any;
    field?: any;
    onChangeCustom?: any;
    placeholder?: any;
    // memo?: boolean;
    customInputStyle?: ViewStyle;
    title?: string;
}
const Input = (props: Props) => {
    const { form, field, onChangeCustom, placeholder, customInputStyle, title, ...remainProps } = props
    const { name, value } = field
    const { errors, touched, setFieldValue } = form;
    const onChangeText = useCallback(
        (text) => {
            setFieldValue(name, text)
        },
        [name, setFieldValue],
    )
    return (
        <View style={styles.containerInput}>
            <Text style={styles.text}>{title}</Text>
            <TextInput
                // {...field}
                {...remainProps}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
            />
            {touched[name] && errors[name] && <div className="err-text">{errors[name]}</div>}
        </View>
    )
}
export default Input;