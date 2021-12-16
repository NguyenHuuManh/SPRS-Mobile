import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useCallback } from "react";
import { Text, TextInput, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MainStyle } from "../../Style/main_style";
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
    underLine?: boolean;
    editable?: boolean;
    customStyle?: propStyle;
    leftView?: any;
}
const Input = (props: Props) => {
    const {
        form, field, onChangeCustom, placeholder,
        customInputStyle, title, iconSize,
        iconLeft, iconColor, iconRight, horizontal,
        styleTitle, secureTextEntry,
        multiline, leftIconOnpress,
        textContentType, underLine,
        editable,
        customStyle,
        leftView,
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
        <View style={[styles.containerInput, editable ? { opacity: 1 } : { opacity: 0.7 }]}>
            {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}
            <View style={{ flexDirection: "row" }}>
                {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                {
                    iconLeft && (
                        <View style={[styles.icon]}>
                            <FontAwesomeIcon size={iconSize || 17} color={iconColor || "#222"} icon={iconLeft} />
                        </View>)
                }
                {
                    leftView && leftView()
                }
                <View style={[styles.inputContainer, underLine ? styles.underLine : {}]}>
                    {textContentType == "telephoneNumber" && (
                        <View style={{ flex: 3, justifyContent: "flex-end", paddingBottom: 10 }}>
                            <Text>+84 |</Text>
                        </View>
                    )}
                    <TextInput
                        // {...field}
                        {...remainProps}
                        value={value}
                        onChangeText={onChangeText}
                        style={[styles.input, customInputStyle]}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        multiline={multiline || false}
                        editable={editable}
                        spellCheck={false}
                    />
                    {
                        iconRight && (
                            <TouchableOpacity
                                onPress={leftIconOnpress}
                                style={[styles.iconRight]}>
                                <FontAwesomeIcon size={iconSize || 17} color={iconColor || "#222"} icon={iconRight} />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            {touched[name] && errors[name] && (
                <View style={{ flexDirection: "row" }}>
                    {iconLeft && (
                        <View style={[styles.icon]}>
                        </View>
                    )}
                    <Text style={[styles.input, MainStyle.texError,]}>{errors[name]}</Text>
                </View>
            )}
        </View>
    )
}
export default Input;