import { findIndex } from "lodash";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { apiGetGroups } from "../../ApiFunction/List";
import { apiCity } from "../../ApiFunction/PlaceAPI";
import { checkCallAPI } from "../../Helper/FunctionCommon";
import { MainStyle } from "../../Style/main_style";
import AppSelect from "../AppSelect"
interface Props {
    form?: any;
    field?: any;
    onSelectOption?: any;
}
export default (props: Props) => {
    const { field, form, onSelectOption, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched } = form
    const [data, setData] = useState([{ id: 0, name: "Mở cửa" }, { id: 1, name: "Đóng cửa tạm thời" }, { id: 2, name: "Đóng cửa" }]);

    // const callGetGroupList = () => {
    //     apiCity()
    //         .then((res) => {
    //             checkCallAPI(
    //                 res,
    //                 (response) => {
    //                     setData(response.obj);
    //                 },
    //                 (e) => { }
    //             );
    //         })
    //         .catch((error) => { })
    // }
    // useEffect(() => {
    //     callGetGroupList();
    // }, [])

    const onSelect = (item) => {
        setFieldValue(name, item.id);
        onSelectOption && (onSelectOption(item));
    }

    if (field) {
        return (
            <>
                <AppSelect
                    header="Chọn tỉnh/thành phố"
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
            header="Chọn tỉnh/thành phố"
            {...remainProps}
            value={value}
            data={data}
            keyValue={(item) => item.id}
            labelValue={(item) => item?.name}
            inputValue={(item) => item?.name}
        />
    )
}