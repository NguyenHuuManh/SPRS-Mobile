import { useRoute } from "@react-navigation/core";
import React from "react";
import StoreDetail from "./Component/StoreDetail";
import ReliefDetail from "./Component/ReliefDetail";
import SosDetail from "./Component/SosDetail";
import OrgDetail from "./Component/OrgDetail";
const DetailPoint = () => {
    const { point, from } = useRoute<any>().params;
    // console.log(point, "point");
    return (
        <>
            {point?.type === "st" && (
                <StoreDetail point={point} from={from} />
            )}
            {point?.type === "rp" && (
                <ReliefDetail point={point} from={from} />
            )}
            {point?.type === "sos" && (
                <SosDetail point={point} from={from} />
            )}
            {point?.type === "org" && (
                <OrgDetail point={point} from={from} />
            )}
        </>
    )
}
export default DetailPoint;