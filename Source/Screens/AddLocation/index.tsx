import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import {
  SafeAreaView, Text, View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonCustom from "../../Components/ButtonCustom";
import HeaderContainer from "../../Components/HeaderContainer";
import Input from "../../Components/Input";
import MapPicker from "../../Components/MapPicker";
import { height, width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import MapView from "./components/MapView";
import styles from "./styles";


const App = ({ navigation }) => {
  const [adressPoint, setAdressPoint] = useState<any>({})
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: height * 0.1 }}>
        <HeaderContainer
          flexRight={0}
          flexCenter={10}
          isBack
          centerEl={(
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, }}>Thêm mới điểm cứu trợ</Text>
            </View>
          )}
        />
      </View>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <Formik
          initialValues={{
            username: "",
            passWord: "",
            birdthDate: "",
            accountType: "",
            rePassWord: "",
            name: "",
          }}
          onSubmit={(values) => {
            // signup(values)
          }}
        >
          {({ }) => (
            <View>
              <Field
                component={Input}
                name="username"
                title="Tên điểm cứu trợ:"
                horizontal
                placeholder="Tên điểm cứu trợ"
                styleTitle={{ width: 110 }}
              />
              <Field
                component={Input}
                name="Số điện thoại"
                title="SĐT :"
                horizontal
                placeholder="Số điện thoại"
                styleTitle={{ width: 110 }}
              />
              <Field
                component={Input}
                name="username"
                title="Loại hình cung cấp:"
                horizontal
                placeholder="Loại hình cung cấp"
                styleTitle={{ width: 110 }}
              />
              <Field
                component={Input}
                name="username"
                title="Địa chỉ:"
                horizontal
                placeholder="Địa chỉ"
                styleTitle={{ width: 110 }}
              />
              <Field
                component={Input}
                name="moTa"
                title="Mô tả:"
                horizontal
                placeholder="Mô tả"
                styleTitle={{ width: 110 }}
              />
              <MapPicker
                title="Địa điểm"
                styleTitle={{ width: 110 }}
                horizontal
                iconRight={faMapMarkedAlt}
                iconSize={20}
                setAdress={setAdressPoint}
                adress={adressPoint}
              />
              {/* <View style={{ flex: 1 }}> */}
              <ButtonCustom title={"Thêm mới"} styleContain={{ backgroundColor: "#F6BB57", marginTop: 50 }} onPress={() => { navigation.goBack() }} />
              {/* </View> */}
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}


export default App;