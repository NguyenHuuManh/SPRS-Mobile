import React, { useState } from "react";
import { Text } from "react-native";
import { MainStyle } from "../../Style/main_style";
import AppSelect from "../AppSelect";
interface Props {
    form?: any;
    field?: any;
    onSelectOption?: any;
    header?: string;
}
export default (props: Props) => {
    const { field, form, onSelectOption, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched } = form
    const [data, setData] = useState([{ id: 0, name: "Khẩn cấp" }, { id: 1, name: "Cần thiết" }, { id: 2, name: "bình thường" }]);
    const onSelect = (item) => {
        setFieldValue(name, item.id);
        onSelectOption && (onSelectOption(item));
    }

    if (field) {
        return (
            <>
                <AppSelect
                    {...field}
                    {...remainProps}
                    value={value}
                    data={data}
                    onItemSelect={onSelect}
                    keyValue={(item) => item.id}
                    labelValue={(item) => item?.name}
                    inputValue={(item) => item?.name}
                />
                {errors[name] && <Text style={[MainStyle.texError]}>{errors[name]}</Text>}
            </>
        )
    }
    return (
        <AppSelect
            {...remainProps}
            value={value}
            data={data}
            keyValue={(item) => item.id}
            labelValue={(item) => item?.name}
            inputValue={(item) => item?.name}
        />
    )
}