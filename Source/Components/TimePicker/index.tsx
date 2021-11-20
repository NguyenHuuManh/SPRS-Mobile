import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppColor } from '../../Helper/propertyCSS';
import { MainStyle } from '../../Style/main_style';
import styles from './styles';
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
        if (event.type == 'dismissed') {
            setShow(false);
            return;
        }
        const date = new Date(selectedDate);
        setShow(false);
        setFieldValue(name, date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getMinutes().toString());
    };

    const revertTime = (value) => {
        const dateStr = isEmpty(value) ? moment().format('YYYY-MM-DD HH:mm:ss') : `2021-10-10 ${value}`
        return moment(dateStr).valueOf();
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
                            {value ? (
                                <TextInput
                                    {...props}
                                    placeholder={placeholder}
                                    value={value}
                                    style={{ color: AppColor.CORLOR_TEXT }}
                                >
                                </TextInput>
                            ) : (
                                <Text style={{ color: AppColor.CORLOR_TEXT }}>{placeholder}</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                    {
                        iconRight && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} /></View>)
                    }
                </View>
                {touched[name] && errors[name] && <Text style={[MainStyle.texError]}>{errors[name]}</Text>}
            </View>
            {show && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={new Date(revertTime(value))}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                />
            )}
        </View>
    );
};