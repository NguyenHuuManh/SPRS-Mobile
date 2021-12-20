import { values } from "lodash";
import React, { memo, useEffect } from "react";
interface Props {
    values: any;
    setDisable: any;
    infor: any;
    disable?: boolean
}
export default memo((props: Props) => {
    const { values, setDisable, infor, disable } = props
    useEffect(() => {
        console.log('values', values);
        console.log('infor', infor);
        if (values?.description == infor?.description && values?.level == infor?.level) {
            if (!disable) setDisable(true);
            return;
        };
        if (disable) setDisable(false);
    }, [values])
    return (
        <></>
    )
})