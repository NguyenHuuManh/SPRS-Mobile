import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { apiGetGroups } from "../../ApiFunction/List";
import { checkCallAPI } from "../../Helper/FunctionCommon";
import { MainStyle } from "../../Style/main_style";
import AppSelect from "../AppSelect";
interface Props {
    form?: any;
    field?: any;
}
export default (props: Props) => {
    const { field, form, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched } = form
    const [data, setData] = useState(null)

    const callGetGroupList = () => {
        apiGetGroups()
            .then((res) => {
                console.log("resGroup", res)

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
        callGetGroupList();
    }, [])

    const onSelect = (item) => {
        setFieldValue(name, item.id);
    }

    // console.log("User", value)
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
            onItemSelect={onSelect}
            keyValue={(item) => item.id}
            labelValue={(item) => item?.name}
            inputValue={(item) => item?.name}
        />
    )
}