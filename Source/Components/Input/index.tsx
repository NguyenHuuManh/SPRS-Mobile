import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useCallback } from "react";
import { Text, TextInput, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
    iconLeft?: any;
    iconRight?: any;
    iconColor?: string;
    iconSize?: number;
    horizontal?: boolean;
    styleTitle?: any;
    secureTextEntry?: boolean;
    multiline?: boolean;
    textContentType: string;
    leftIconOnpress?: () => {};
}
const Input = (props: Props) => {
    const {
        form, field, onChangeCustom, placeholder,
        customInputStyle, title, iconSize,
        iconLeft, iconColor, iconRight, horizontal,
        styleTitle, secureTextEntry,
        multiline, leftIconOnpress,
        textContentType,
        ...remainProps
    } = props
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
            {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}
            <View style={{ flexDirection: "row" }}>
                {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                {
                    iconLeft && (
                        <View style={[styles.icon]}>
                            <FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconLeft} />
                        </View>)
                }
                <View style={[styles.inputContainer]}>
                    {textContentType == "telephoneNumber" && (
                        <View style={{ flex: 2, justifyContent: "flex-end", paddingBottom: 10 }}>
                            <Text>84+ |</Text>
                        </View>
                    )}
                    <TextInput
                        // {...field}
                        {...remainProps}
                        value={value}
                        onChangeText={onChangeText}
                        style={styles.input}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        multiline={multiline || false}
                    />
                    {
                        iconRight && (
                            <TouchableOpacity
                                onPress={leftIconOnpress}
                                style={[styles.iconRight]}>
                                <FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            {touched[name] && errors[name] && <div className="err-text">{errors[name]}</div>}
        </View>
    )
}
export default Input;