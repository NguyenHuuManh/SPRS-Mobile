import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { apiGetGroups } from "../../ApiFunction/List";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { checkCallAPI } from "../../Helper/FunctionCommon";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles"
import { findIndex, isEmpty } from "lodash";
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
    defaultValue?: any;
    disabled?: boolean;
}

export default (props: Props) => {
    const { form, field, onChangeCustom, placeholder, customInputStyle, title, iconSize, iconLeft, iconColor, iconRight, horizontal, styleTitle, disabled, ...remainProps } = props
    const { name, value } = field
    const { errors, touched, setFieldValue } = form;
    const [textInputValue, setTextInputValue] = useState("");
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])

    const callGetGroupList = () => {
        apiGetGroups()
            .then((res) => {
                checkCallAPI(
                    res,
                    (response) => {
                        setData(response.lstObj);
                    },
                    (e) => { }
                );
            })
            .catch((error) => { })
    }

    useEffect(() => {
        if (field?.value && !isEmpty(field?.value + "") && data.length > 0) {
            // data ? data?.find((option) => option?.value?.toString() === field?.value?.toString()) : '';
            const index = findIndex(data, function (e) {
                return e.id == field.value;
            })
            const option = data[index];
            setTextInputValue(option?.name);
        }
    }, [field?.value, data])

    useEffect(() => {
        callGetGroupList();
    }, [])
    const onSelect = (item) => {
        setFieldValue(name, item.id);
        // setTextInputValue(item?.name);
        setShow(false)
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={{ minHeight: 50, borderBottomWidth: 0.5, justifyContent: "center", backgroundColor: `${item.id + "" == value + "" ? 'rgba(60, 60, 60,0.1)' : "#FFF"}`, paddingLeft: 10, paddingRight: 10 }}
                onPress={() => { onSelect(item) }}>
                <Text key={item.id}>{item?.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.containerInput}>
            {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}
            <View style={{ flexDirection: "row" }}>
                {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                {
                    iconLeft && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconLeft} /></View>)
                }
                <TouchableOpacity onPress={() => { setShow(true) }} style={styles.input} disabled={disabled}>
                    <View style={{ width: "90%" }} pointerEvents="none" >
                        <TextInput
                            // {...field}
                            {...remainProps}
                            value={textInputValue}
                            placeholder={placeholder}
                        />
                    </View>
                    <View style={{ width: "10%" }}>
                        <FontAwesomeIcon icon={faChevronDown} size={iconSize || 20} color={iconColor || "#c3c1c1"} />
                    </View>
                </TouchableOpacity>
                <Modal
                    visible={show}
                    animationType="fade"
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => { setShow(false) }}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(60, 60, 60,0.2)' }}>
                        <TouchableWithoutFeedback
                            onPress={(e) => { e.preventDefault() }}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ maxHeight: "50%", width: "80%", minHeight: "30%", backgroundColor: "#FFFF", borderRadius: 10, paddingTop: 10, paddingBottom: 10 }}>
                                <FlatList
                                    data={data}
                                    keyExtractor={({ value }) => value}
                                    renderItem={renderItem}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                {
                    iconRight && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} /></View>)
                }
            </View>
            {touched[name] && errors[name] && <Text style={[MainStyle.texError]}>{errors[name]}</Text>}
        </View>
    )
}