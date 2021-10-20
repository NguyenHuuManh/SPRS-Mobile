import React, { useEffect, useState } from 'react';
import { View, Button, Platform, Text, ViewStyle, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment'
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
    const [show, setShow] = useState(false);
    const { name, value } = field
    // const [date, setDate] = useState(new Date());
    const { errors, touched, setFieldValue } = form;
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setFieldValue(name, moment(currentDate).format("DD-MM-YYYY"))
    };

    const revertDate = (value) => {
        let arr = value.split("/")
        return arr[2] + "/" + arr[1] + "/" + arr[0]
    }

    return (
        <View>
            <View style={[styles.containerInput]}>
                {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}

                <View style={{ flexDirection: "row" }}>
                    {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                    {
                        iconLeft && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconLeft} /></View>)
                    }
                    <TouchableOpacity onPress={() => { setShow(true) }} style={[styles.input]}>
                        <Text>{value} </Text>
                    </TouchableOpacity>
                    {
                        iconRight && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} /></View>)
                    }
                </View>
                {touched[name] && errors[name] && <div className="err-text">{errors[name]}</div>}
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(Date.parse(revertDate(value)))}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};