import React, { useState, useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { apiSignin, apiSigup } from "../../ApiFunction/Auth";
import { Store } from "../..";
import httpServices from "../../Services/httpServices";
import { userActions } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
export default () => {
    const { user: { setUser } } = useContext(Store)
    const [userName, setUserNAme] = useState<any>("");
    const [passWord, setPassWord] = useState<any>("");
    const dispatch = useDispatch()
    const signin = () => {
        dispatch(userActions.loginReques({ username: "manh19999", password: "spring123" }));
    }

    const signup = () => {
        try {
            apiSigup({ username: "manh19999", password: "spring123", phoneNumber: "0169760397911" })
                .then((e) => {
                    console.log(e, "response");
                    httpServices.saveLocalStorage("user", e.data);
                    setUser(e.data);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <Text>Account:</Text>
            <TextInput onChangeText={(e) => { setUserNAme(e) }} value={userName} />
            <Text>Password:</Text>
            <TextInput onChangeText={(e) => { setPassWord(e) }} value={passWord} />
            <Button title="Login" onPress={() => { signin() }} ></Button>
            <Button title="Signup" onPress={() => { signup() }}></Button>
        </View>
    )
}