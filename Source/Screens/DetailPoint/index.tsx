import { useRoute } from "@react-navigation/core";
import React from "react";
import StoreDetail from "./Component/StoreDetail";
const DetailPoint = () => {
    const { point } = useRoute<any>().params;
    return (
        <>
            <StoreDetail point={point} />
        </>
    )
}
export default DetailPoint;