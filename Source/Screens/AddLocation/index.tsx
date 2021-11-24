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
import { height } from "../../Helper/responsive";
import styles from "./styles";
import { apiCreateReliefPoint } from "../../ApiFunction/ReliefPoint"
import Toast from "react-native-toast-message";
import MultipleAddItem from "../../Components/MultipleAddItem";
import DateTimePicker from "../../Components/DateTimePicker"
const body = {
  name: "abc",
  description: "",
  open_time: "",
  close_time: "",
  status: "isActive",
  reliefInformations: ""
}
const App = ({ navigation }) => {
  const [adressPoint, setAdressPoint] = useState<any>({})
  const [items, setItems] = useState<any>([]);

  const callCreatePoint = (body) => {
    apiCreateReliefPoint(body).then((res) => {
      if (res.status == 200) {
        if (res.data.code == "200") {
          Toast.show({
            type: "success",
            text1: "Tạo điểm cửa hàng thành công",
            position: "top"
          })
        }
      } else {
        Toast.show({
          type: "error",
          text1: res.data.message,
          position: "top"
        })
      }
    })
  }
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
            open_time: "",
            close_time: "",
            status: "",
            name: "SPRS",
            description: "",
          }}
          onSubmit={(values) => {

            const body = {
              ...values,
              reliefInformations: items.map((e) => {
                return {
                  quantity: e.quantity,
                  item: {
                    id: e.id
                  }
                }
              }),
              address: {
                city: {
                  code: "",
                  id: "",
                  name: adressPoint.city
                },
                district: {
                  code: "",
                  id: "",
                  name: adressPoint?.district,
                },
                subDistrict: {
                  code: "",
                  id: "",
                  name: adressPoint?.subDistrict,
                },
                addressLine: "",
                addressLine2: "",
                GPS_lati: adressPoint?.GPS_Lati,
                GPS_long: adressPoint?.GPS_long
              },
            }
            callCreatePoint(body);
          }}
        >
          {({ submitForm }) => (
            <View>
              <Field
                component={Input}
                name="name"
                // title="Tên điểm cứu trợ:"
                horizontal
                placeholder="Tên điểm cứu trợ"
                styleTitle={{ width: 110 }}
              />
              <Field
                component={DateTimePicker}
                name="open_time"
                // title="Thời gian hoạt động"
                horizontal
                placeholder="Mở cửa"
                styleTitle={{ width: 110 }}
              />
              <Field
                component={DateTimePicker}
                name="close_time"
                // title="Thời gian kết thúc"
                horizontal
                placeholder="Đóng cửa"
                styleTitle={{ width: 110 }}
              />
              <Field
                component={Input}
                name="description"
                // title="Mô tả:"
                horizontal
                placeholder="Mô tả"
                styleTitle={{ width: 110 }}
              />
              <MapPicker
                // title="Địa điểm"
                styleTitle={{ width: 110 }}
                horizontal
                iconRight={faMapMarkedAlt}
                iconSize={20}
                setAdress={setAdressPoint}
                adress={adressPoint}
              />
              <MultipleAddItem items={items} setItems={setItems} />
              {/* <View style={{ flex: 1 }}> */}
              <ButtonCustom title={"Thêm mới"} styleContain={{ backgroundColor: "#F6BB57", marginTop: 50 }} onPress={() => { submitForm() }} />
              {/* </View> */}
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}


export default App;