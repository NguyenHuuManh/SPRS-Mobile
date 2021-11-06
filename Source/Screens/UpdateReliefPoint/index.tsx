import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import {
  SafeAreaView, Text, View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { apiCreateReliefPoint } from "../../ApiFunction/ReliefPoint";
import ButtonCustom from "../../Components/ButtonCustom";
import DateTimePicker from "../../Components/DateTimePicker";
import HeaderContainer from "../../Components/HeaderContainer";
import Input from "../../Components/Input";
import MapPicker from "../../Components/MapPicker";
import MultipleAddItem from "../../Components/MultipleAddItem";
import { height } from "../../Helper/responsive";
import styles from "../AddLocation/styles";
import { useRoute } from "@react-navigation/core";
import MapView from "./components/MapView";
import { MainStyle } from "../../Style/main_style";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../Constrants/DataGlobal";
import ContainerField from "../../Components/ContainerField";

const UpdateReliefPoint = ({ navigation }) => {
  const [items, setItems] = useState<any>([]);

  const item = useRoute<any>().params;
  console.log("item", item);
  const [adressPoint, setAdressPoint] = useState<any>({
    GPS_Lati: item.address.GPS_lati,
    GPS_long: item.address.GPS_long,
    city: "",
    district: "",
    subDistrict: "",
  })
  console.log("address", adressPoint)
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
      <View style={{ height: "7%" }}>
        <HeaderContainer
          flexRight={0}
          flexCenter={10}
          isBackReLoad="ReliefPoint"
          centerEl={(
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, }}>Cập nhật điểm cứu trợ</Text>
            </View>
          )}
        />
      </View>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[{ width: "100%", height: 180, backgroundColor: "FFFF", padding: 1, borderRadius: 10, marginTop: 20 }, MainStyle.boxShadow]}>
          <MapView defaultLocation={{
            latitude: Number(adressPoint.GPS_Lati),
            longitude: Number(adressPoint?.GPS_long),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }} />
        </View>
        <Formik
          initialValues={{
            open_time: item?.open_time || "",
            close_time: item?.close_time || "",
            status: item?.status || "",
            name: item?.name || "",
            description: item?.description || "",
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
            console.log("body", body);
            callCreatePoint(body);
          }}
        >
          {({ submitForm }) => (
            <View>

              <ContainerField title="Tên điểm cứu trợ">
                <Field
                  component={Input}
                  name="name"
                  horizontal
                  placeholder="Tên điểm cứu trợ"
                  styleTitle={{ width: 110 }}
                />
              </ContainerField>

              <ContainerField title="Thời gian hoạt động">
                <Field
                  component={DateTimePicker}
                  name="open_time"
                  horizontal
                  placeholder="Mở cửa"
                  styleTitle={{ width: 110 }}
                />
              </ContainerField>
              <ContainerField title="Thời gian kết thúc">
                <Field
                  component={DateTimePicker}
                  name="close_time"
                  horizontal
                  placeholder="Đóng cửa"
                  styleTitle={{ width: 110 }}
                />
              </ContainerField>
              <ContainerField title="Mô tả">
                <Field
                  component={Input}
                  name="description"
                  horizontal
                  placeholder="Mô tả"
                  styleTitle={{ width: 110 }}
                />
              </ContainerField>
              <ContainerField title="Địa điểm">
                <MapPicker
                  styleTitle={{ width: 110 }}
                  horizontal
                  iconRight={faMapMarkedAlt}
                  iconSize={20}
                  setAdress={setAdressPoint}
                  adress={adressPoint}
                  defaultAdress={adressPoint}
                />
              </ContainerField>


              <ContainerField title="Mặt hàng">
                <MultipleAddItem items={items} setItems={setItems} />
              </ContainerField>

              {/* <View style={{ flex: 1 }}> */}
              <ButtonCustom title={"Thêm mới"} styleContain={{ backgroundColor: "#F6BB57", marginTop: 30, width: "90%" }} onPress={() => { submitForm() }} />
              {/* </View> */}
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default UpdateReliefPoint;