import React, { useEffect, useState } from 'react';
import { View, Button, Platform, Text, ViewStyle, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment'
import { MainStyle } from '../../Style/main_style';
import { isEmpty } from 'lodash';
import { AppColor } from '../../Helper/propertyCSS';
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
    underLine?: any;
}
export default (props: Props) => {
    const { form, field, onChangeCustom, placeholder, customInputStyle, title, iconSize, iconLeft, iconColor, iconRight, horizontal, styleTitle, underLine, ...remainProps } = props
    const [show, setShow] = useState(false);
    const { name, value } = field
    // const [date, setDate] = useState(new Date());
    const { errors, touched, setFieldValue } = form;
    const onChange = (event, selectedDate) => {
        const currentTime = selectedDate;
        setShow(Platform.OS === 'ios');
        setFieldValue(name, moment(currentTime).format('YYYY-MM-DD HH:mm:ss').split(" ")[1]);
    };

    const revertTime = (value) => {
        const dateStr = isEmpty(value) ? moment().format('YYYY-MM-DD HH:mm:ss') : `2021-10-10 ${value}`
        console.log("dateStr", dateStr);
        return dateStr;
    }

    return (
        <View>
            <View style={[styles.containerInput]}>
                {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}

                <View style={{ flexDirection: "row" }}>
                    {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                    {
                        iconLeft && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 17} color={iconColor || "#222"} icon={iconLeft} /></View>)
                    }
                    <TouchableOpacity onPress={() => { setShow(true) }} style={[styles.input, underLine ? styles.underLine : {}]}>
                        <View pointerEvents="none">
                            <TextInput
                                {...props}
                                placeholder={placeholder}
                                value={value}
                                style={{ color: AppColor.CORLOR_TEXT }}
                            >
                            </TextInput>
                        </View>
                    </TouchableOpacity>
                    {
                        iconRight && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} /></View>)
                    }
                </View>
                {touched[name] && errors[name] && <Text style={[MainStyle.texError]}>{errors[name]}</Text>}
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(Date.parse(revertTime(value)))}
                    mode="time"
                    display="spinner"
                    onChange={onChange}
                    is24Hour
                />
            )}
        </View>
    );
};