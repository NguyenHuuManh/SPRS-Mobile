import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isEmpty, isNull } from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppColor } from '../../Helper/propertyCSS';
import { MainStyle } from '../../Style/main_style';
import styles from './styles';
interface Props {
    form?: any;
    field?: any;
    onChangeCustom?: any;
    placeholder?: any;
    customInputStyle?: ViewStyle;
    title?: string;
    iconLeft?: any;
    iconRight?: any;
    iconColor?: string;
    iconSize?: number;
    horizontal?: boolean;
    styleTitle?: any;
    underLine?: any;
    disabled?: boolean;
    dateFormat?: string;
}
export default (props: Props) => {
    const { form, field, onChangeCustom, placeholder, customInputStyle, title, iconSize, iconLeft, iconColor, iconRight, horizontal, styleTitle, underLine, disabled, dateFormat, ...remainProps } = props
    const [show, setShow] = useState(false);
    const { name, value } = field
    const { errors, touched, setFieldValue } = form;
    const onChange = (event, selectedDate) => {
        if (event.type + '' === 'neutralButtonPressed') {
            setShow(false);
            setFieldValue(name, "");
        }
        if (event.type + '' === 'set') {
            const currentDate = selectedDate;
            setShow(false);
            setFieldValue(name, moment(currentDate).format("DD-MM-YYYY"))
        }
        if (event.type + '' === 'dismissed') {
            setShow(false);
        }
    };


    const revertDate = (value) => {
        let dateStr = "";

        // const dateStr = (isEmpty(value) || isNull(value)) ? moment().format("YYYY-MM-DD") : moment(value).format("YYYY-MM-DD");
        if (isEmpty(value) || isNull(value)) {
            dateStr = moment().format("YYYY-MM-DD");
        } else {
            const arr = value.split("-");
            dateStr = arr[2] + arr[1] + arr[0];
        }
        return moment(dateStr).valueOf();
    }
    return (
        <View pointerEvents={`${disabled ? 'none' : 'auto'}`}>
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
            {
                show && (
                    <DateTimePicker
                        value={new Date(revertDate(value))}
                        mode="date"
                        display="spinner"
                        onChange={onChange}
                        disabled={disabled}
                        dateFormat='day month year'
                        neutralButtonLabel="clear"
                    />
                )
            }
        </View>
    );
};