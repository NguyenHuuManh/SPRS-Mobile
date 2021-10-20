import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
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
}

export default (props: Props) => {
    const { form, field, onChangeCustom, placeholder, customInputStyle, title, iconSize, iconLeft, iconColor, iconRight, horizontal, styleTitle, ...remainProps } = props
    const { name, value } = field
    const { errors, touched, setFieldValue } = form;
    const [textInputValue, setTextInputValue] = useState("");
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])

    return (
        <View style={styles.containerInput}>
            {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}
            <View style={{ flexDirection: "row" }}>
                {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                {
                    iconLeft && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconLeft} /></View>)
                }
                <TouchableOpacity onPress={() => { setShow(true) }} style={styles.input}>
                    <View style={{ width: "90%" }}>
                        <TextInput
                            // {...field}
                            {...remainProps}
                            value={textInputValue}
                            editable={false}
                            placeholder={placeholder}
                        />
                    </View>
                    <View style={{ width: "10%" }}>
                        <FontAwesomeIcon icon={faChevronDown} size={iconSize || 20} color={iconColor || "#c3c1c1"} />
                    </View>
                </TouchableOpacity>
                <Modal
                    visible={show}
                    animationType="slide"
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => { setShow(false) }}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(60, 60, 60,0.9)' }}>
                        <TouchableWithoutFeedback
                            onPress={(e) => { e.preventDefault() }}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ maxHeight: "50%", width: "80%", minHeight: "30%", backgroundColor: "#FFFF", borderRadius: 10, paddingTop: 10, paddingBottom: 10 }}>
                                <FlatList
                                    data={data}
                                    keyExtractor={({ value }) => value}
                                    renderItem={renderItem}
                                    key="DroplistGroup"
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                {
                    iconRight && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} /></View>)
                }
            </View>
            {touched[name] && errors[name] && <div className="err-text">{errors[name]}</div>}
        </View>
    )
}