import React, { useState, useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { apiSignin, apiSigup } from "../../ApiFunction/Auth";
import httpServices from "../../Services/httpServices";
import { userActions } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import Input from "../../Components/Input";
import ButtonCustom from "../../Components/ButtonCustom";
import styles from "./styles";
// import Loader from 'react-native-easy-content-loader';
export default () => {
    const [userName, setUserNAme] = useState<any>("");
    const [passWord, setPassWord] = useState<any>("");
    const dispatch = useDispatch()
    const signin = ({ username, passWord }) => {
        dispatch(userActions.loginReques({ username: username || "manh19999", password: passWord || "spring123" }));
    }

    const signup = () => {
        try {
            apiSigup({ username: "manh19999", password: "spring123", phoneNumber: "0169760397911" })
                .then((e) => {
                    console.log(e, "response");
                    httpServices.saveLocalStorage("user", e.data);
                }).finally(() => { })
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <Formik
            initialValues={{
                username: "",
                passWord: "",
            }}
            onSubmit={(values) => {
                signin(values)
            }}
        >
            {({ submitForm }) => (
                <View style={styles.container}>
                    <Field
                        component={Input}
                        title="Tài khoản:"
                        name="username"
                    />
                    <Field
                        component={Input}
                        name="passWord"
                        title="Mật khẩu:"
                        secureTextEntry
                    />
                    <ButtonCustom title="Đăng nhập" onPress={submitForm} />

                </View>
            )}
        </Formik>
    )

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