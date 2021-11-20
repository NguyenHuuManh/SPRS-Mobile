import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker'
import { isEmpty, isNull } from 'lodash';
import moment from 'moment';
import React, { createRef, useState } from 'react';
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
    const { name, value } = field
    const { errors, touched, setFieldValue } = form;
    const ref = createRef<any>()
    const onChange = (date1) => {
        setFieldValue(name, date1);
    };

    return (
        <View>
            <View style={[styles.containerInput]}>
                {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}

                <View style={{ flexDirection: "row" }}>
                    {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                    {
                        iconLeft && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 17} color={iconColor || "#222"} icon={iconLeft} /></View>)
                    }
                    <TouchableOpacity onPress={() => { ref.current.onPressDate() }} style={[styles.input, underLine ? styles.underLine : {}]}>
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
            <DatePicker
                value={value}
                mode="date"
                androidMode="spinner"
                onDateChange={onChange}
                disabled={disabled}
                format="DD-MM-YYYY"
                showIcon={false}
                hideText={true}
                style={{ display: "none" }}
                ref={ref}
            />
        </View>
    );
};