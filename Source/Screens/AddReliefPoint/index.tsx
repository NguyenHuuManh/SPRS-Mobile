import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Field, Formik } from "formik";
import { isEmpty, isNull } from "lodash";
import React, { createRef, useEffect, useState } from "react";
import {
  SafeAreaView, Text, View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { apiCreateReliefPoint } from "../../ApiFunction/ReliefPoint";
import ButtonCustom from "../../Components/ButtonCustom";
import ContainerField from "../../Components/ContainerField";
import DateTimePicker from "../../Components/DateTimePicker";
import HeaderContainer from "../../Components/HeaderContainer";
import Input from "../../Components/Input";
import MapPicker from "../../Components/MapPicker";
import MultipleAddItem from "../../Components/MultipleAddItem";
import TimePicker from "../../Components/TimePicker";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../Constrants/DataGlobal";
import { height } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import styles from "../AddLocation/styles";
import MapView from "./components/MapView";
const AddReliefPoint = ({ navigation }) => {
  const [adressPoint, setAdressPoint] = useState<any>({
    GPS_Lati: "21.00554564179488",
    GPS_long: "105.51689565181731",
    city: "",
    district: "",
    subDistrict: "",
  })
  const [items, setItems] = useState<any>([]);
  const formikRef = createRef<any>();

  useEffect(() => {
    if (!formikRef?.current || isNull(formikRef.current)) return;
    if (isEmpty((adressPoint.city + "" + adressPoint.district + "" + adressPoint.subDistrict))) {
      formikRef.current.setFieldValue("address", "");
      return;
    }
    formikRef.current.setFieldValue("address", adressPoint.city + "-" + adressPoint.district + "-" + adressPoint.subDistrict);
  }, [adressPoint])
  const callCreatePoint = (body) => {
    apiCreateReliefPoint(body).then((res) => {
      console.log("res", res)
      if (res.status == 200) {
        if (res.data.code == "200") {
          Toast.show({
            type: "success",
            text1: "Tạo điểm cứu trợ thành công",
            position: "top"
          });
          return;
        }
        Toast.show({
          type: "error",
          text1: res.data.message,
          position: "top"
        });
        return;
      } else {
        Toast.show({
          type: "error",
          text1: "Chức năng đang được bảo trì",
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
              <Text style={{ fontSize: 20, color: "#FFFF" }}>Thêm mới điểm cứu trợ</Text>
            </View>
          )}
        />
      </View>

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[{ width: "100%", height: 180, backgroundColor: "FFFF", padding: 1, borderRadius: 10, marginTop: 20 }, MainStyle.boxShadow]}>
          <MapView
            defaultLocation={{
              latitude: Number(adressPoint.GPS_Lati),
              longitude: Number(adressPoint?.GPS_long),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          />
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={{
            open_Hour_time: "",
            close_Hour_time: "",
            open_Date_time: "",
            close_Date_time: "",
            status: "",
            name: "SPRS",
            description: "",
            address: "",
          }}
          onSubmit={(values) => {
            const body = {
              ...values,
              open_time: values.open_Date_time + " " + values.open_Hour_time,
              close_time: values.close_Date_time + " " + values.close_Hour_time,
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
            delete body.close_Date_time;
            delete body.close_Hour_time;
            delete body.open_Date_time;
            delete body.open_Hour_time;
            callCreatePoint(body);
          }}
        >
          {({ submitForm, errors }) => (
            <View>
              <ContainerField title="Tên điểm">
                <Field
                  component={Input}
                  name="name"
                  // title="Tên điểm cứu trợ:"
                  horizontal
                  placeholder="Tên điểm cứu trợ"
                  styleTitle={{ width: 110 }}
                />
              </ContainerField>

              <ContainerField title="Thời gian hoạt động">
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 3 }}>
                    <Field
                      component={DateTimePicker}
                      name="open_Date_time"
                      horizontal
                      placeholder="Ngày nở cửa"
                      styleTitle={{ width: 110 }}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Field
                      component={TimePicker}
                      name="open_Hour_time"
                      horizontal
                      placeholder="Giờ mở cửa"
                      styleTitle={{ width: 110 }}
                    />
                  </View>
                </View>
              </ContainerField>
              <ContainerField title="Thời gian kết thúc">
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 3 }}>
                    <Field
                      component={DateTimePicker}
                      name="close_Date_time"
                      horizontal
                      placeholder="Ngày đóng cửa"
                      styleTitle={{ width: 110 }}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Field
                      component={TimePicker}
                      name="close_Hour_time"
                      horizontal
                      placeholder="Giờ đóng cửa"
                      styleTitle={{ width: 110 }}
                    />
                  </View>
                </View>
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

              <ContainerField title="Chọn địa điểm">
                <MapPicker
                  // title="Địa điểm"
                  styleTitle={{ width: 110 }}
                  horizontal
                  iconRight={faMapMarkedAlt}
                  iconSize={20}
                  setAdress={setAdressPoint}
                  adress={adressPoint}
                />
                <Text style={[MainStyle.texError,]}>{errors["address"]}</Text>
              </ContainerField>
              <ContainerField title="Sản phẩm">
                <MultipleAddItem items={items} setItems={setItems} />
              </ContainerField>
              <ButtonCustom
                title={"Thêm mới"}
                styleTitle={{ color: "#FFF" }}
                styleContain={{ backgroundColor: "#F6BB57", marginTop: 30, color: "#FFFF", width: "90%" }}
                onPress={() => { submitForm() }} />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddReliefPoint;