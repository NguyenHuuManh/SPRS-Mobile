
import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import SockJS from "sockjs-client";
import { Client, Stomp, } from "@stomp/stompjs";
import socketIO from 'socket.io-client';

export default () => {
    const [response, setResponse] = useState<any>("");
    var stompClient = null
    const connect = () => {
        const socket = new SockJS("https://rest-sprs-wbs.herokuapp.com/wbs-sprs-nort");
        stompClient = Stomp.over(socket)
        stompClient.connect(
            {},
            function (frame) {
                console.log('Connectedsadas: ' + frame);
                stompClient.subscribe(
                    `/client/nortification`,
                    message => {
                        console.log("message", message.body)
                    }
                )
            },
            function (error) {
                console.log("Web socket error", error);
            }
        );
        stompClient.onreceive = (mess) => {
            console.log("recive" + mess);
        }
        stompClient.onreceipt = (mess) => {
            console.log("onreceipt" + mess);
        }



    }

    const showMessage = (message) => {
        console.log("message", message);
    }

    function sendLocation() {
        console.log("dasdsad", stompClient.brokerURL);
        stompClient.send("app/location", {}, JSON.stringify({ 'code': "101", 'name': "Manh", 'phone': "10000", 'longtitude': "21.0263084", 'latitude': "105.7709134" }));
        // stompClient.publish({ destination: "https://rest-sprs-wbs.herokuapp.com/app/location", body: JSON.stringify({ 'code': "100", 'name': "Manh", 'phone': "10000", 'longtitude': "21.0263084", 'latitude': "105.7709134" }) });
    }


    var connect_callback = function (frame) {
        // called back after the client is connected and authenticated to the STOMP server\
        console.log(frame, "Contected")
    };

    var error_callback = function (error) {
        // display the error's message header:
        console.log(error, "ERROR");
    };

    const connect1 = () => {
        console.log("fsdfss")
        var client = Stomp.client("wss://rest-sprs-wbs.herokuapp.com/wbs-sprs-nort");
        client.connect({}, connect_callback, error_callback);
    }

    useEffect(() => {
        connect();
    }, [])
    return (
        <>
            <Text>{response || "Can't not connect"}</Text>
            <Button title="Send Location" onPress={() => { sendLocation() }}></Button>
            {/* <Button title="Disconnect" onPress={() => { disconnect() }}></Button> */}
        </>
    )
}