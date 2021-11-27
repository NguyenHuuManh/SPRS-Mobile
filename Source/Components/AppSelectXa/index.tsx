import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { apiSubDistrict } from "../../ApiFunction/PlaceAPI";
import { checkCallAPI } from "../../Helper/FunctionCommon";
import { MainStyle } from "../../Style/main_style";
import AppSelect from "../AppSelect";
interface Props {
    form?: any;
    field?: any;
    idHuyen?: string | number;
    // defaultValue?: boolean;
}
export default (props: Props) => {
    const { field, form, idHuyen, ...remainProps } = props
    const { name, value } = field
    const { errors, setFieldValue, touched } = form
    const [data, setData] = useState(null)
    const [disableClear, setDisableClear] = useState(true);

    const callGetGroupList = () => {
        if ((!idHuyen || isEmpty(idHuyen + "") || isNull(idHuyen))) {
            if (!isNull(data)) {
                setDisableClear(false);
                setData([]);
                return;
            }
            return;
        }
        apiSubDistrict(idHuyen)
            .then((res) => {
                checkCallAPI(
                    res,
                    (response) => {
                        setData([...response.obj]);
                    },
                    (e) => { }
                );
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        callGetGroupList();
    }, [idHuyen])

    const onSelect = (item) => {
        setFieldValue(name, item.id);
    }

    if (field) {
        return (
            <>
                <AppSelect
                    header="Chọn xã/phường"
                    {...field}
                    {...remainProps}
                    value={value}
                    data={data}
                    onItemSelect={onSelect}
                    keyValue={(item) => item.id}
                    labelValue={(item) => item?.name}
                    inputValue={(item) => item?.name}
                    disableClear={disableClear}
                />
                {errors[name] && <Text style={[MainStyle.texError]}>{errors[name]}</Text>}
            </>
        )
    }
    return (
        <AppSelect
            header="Chọn xã/phường"
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