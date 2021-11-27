import { useRoute } from "@react-navigation/core";
import React from "react";
import StoreDetail from "./Component/StoreDetail";
import ReliefDetail from "./Component/ReliefDetail";
const DetailPoint = () => {
    const { point, from } = useRoute<any>().params;
    return (
        <>
            {point?.type === "st" && (
                <StoreDetail point={point} from={from} />
            )}
            {point?.type === "rp" && (
                <ReliefDetail point={point} from={from} />
            )}
        </>
    )
}
export default DetailPoint;