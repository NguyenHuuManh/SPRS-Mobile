import { useRoute } from "@react-navigation/core";
import React from "react";
import StoreDetail from "./Component/StoreDetail";
import ReliefDetail from "./Component/ReliefDetail";
const DetailPoint = () => {
    const { point } = useRoute<any>().params;
    console.log("point", point);
    return (
        <>
            {point?.type === "st" && (
                <StoreDetail point={point} />
            )}
            {point?.type === "rp" && (
                <ReliefDetail point={point} />
            )}
        </>
    )
}
export default DetailPoint;