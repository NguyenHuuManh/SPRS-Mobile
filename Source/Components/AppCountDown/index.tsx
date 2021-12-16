import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppColor } from "../../Helper/propertyCSS";
interface Props {
    onClick: any,
    minuteStart: any,
    onStop: any
}
const CountDown = (props) => {
    const { onClick, minuteStart, onStop } = props;
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        if (!minuteStart || !minuteStart?.value) return;
        let sec = 0;
        let minute = minuteStart?.value;
        const countDown = setInterval(function () {
            if (minute == 0 && sec == 0) {
                console.log(minute, 'minute');
                onStop && onStop();
                clearInterval(countDown);
            } else {
                if (sec == 0) {
                    minute--;
                    sec = 60;
                    if (minute == 0) {
                    }
                } else {
                    sec--;
                }
                setMinutes(minute);
                setSeconds(sec);
            }

        }, 1000);
    }, [minuteStart])

    return (
        <View>
            <View>
                {(minutes == 0 && seconds == 0) ? (
                    <View>
                        <TouchableOpacity
                            onPress={(e) => {
                                e.preventDefault();
                                onClick();
                            }}
                        >
                            <Text style={{ color: AppColor.BUTTON_MAIN }}> gửi lại</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text> {minutes} : {seconds}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

export default CountDown;