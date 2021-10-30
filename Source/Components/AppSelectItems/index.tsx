import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { apiGetItemType } from "../../ApiFunction/List";
import { checkCallAPI } from "../../Helper/FunctionCommon";
import { MainStyle } from "../../Style/main_style";
import AppSelect from "../AppSelect";
interface Props {
    form?: any;
    field?: any;
    defaultValue?: boolean;
    onSelectOption?: any;
}
export default (props: Props) => {
    const { field, form, onSelectOption, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched, values } = form
    const [data, setData] = useState([])

    const callGetItems = () => {
        apiGetItemType()
            .then((res) => {
                checkCallAPI(
                    res,
                    (response) => {
                        setData(response.obj);
                    },
                    (e) => { }
                );
            })
            .catch((error) => { })
    }
    useEffect(() => {
        callGetItems();
    }, [])

    const onSelect = (item) => {
        setFieldValue(name, item.id);
        onSelectOption && onSelectOption(item);
    }

    if (field) {
        return (
            <>
                <AppSelect
                    {...field}
                    {...remainProps}
                    value={value}
                    data={data}
                    onSelectCustum={onSelect}
                    idKey="id"
                    lableKey="name"
                />
                {touched[name] && errors[name] && <Text style={[MainStyle.texError]}>{errors[name]}</Text>}
            </>
        )
    }
    return (
        <AppSelect
            {...remainProps}
            value={value}
            data={data}
        />
    )
}