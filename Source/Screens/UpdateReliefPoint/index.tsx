import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView, Text, View, ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { apiCreateReliefPoint, apiGetReliefPointDetail, apiUpdateReliefPoint } from "../../ApiFunction/ReliefPoint";
import ButtonCustom from "../../Components/ButtonCustom";
import DateTimePicker from "../../Components/DateTimePicker";
import TimePicker from "../../Components/TimePicker";
import HeaderContainer from "../../Components/HeaderContainer";
import Input from "../../Components/Input";
import MapPicker from "../../Components/MapPicker";
import MultipleAddItem from "../../Components/MultipleAddItem";
import { height, width } from "../../Helper/responsive";
import styles from "../AddLocation/styles";
import { useRoute } from "@react-navigation/core";
import MapView from "./components/MapView";
import { MainStyle } from "../../Style/main_style";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../Constrants/DataGlobal";
import ContainerField from "../../Components/ContainerField";
import { isNull, isUndefined } from "lodash";
import { update } from "./validate";

const UpdateReliefPoint = ({ navigation }) => {
  const [items, setItems] = useState<any>([]);
  const [data, setData] = useState<any>({})

  const item = useRoute<any>().params;
  const [adressPoint, setAdressPoint] = useState<any>({
    GPS_Lati: item.address.GPS_lati,
    GPS_long: item.address.GPS_long,
    city: "",
    district: "",
    subDistrict: "",
  })
  const callUpdateReliefPoint = (body) => {
    apiUpdateReliefPoint(body).then((res) => {
      if (res.status == 200) {
        if (res.data.code == "200") {
          Toast.show({
            type: "success",
            text1: "Cập nhật thành công",
            position: "top"
          })
          return;
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

  const callGetReliefPointDetail = () => {
    apiGetReliefPointDetail({ id: item.id }).then((res) => {
      if (res.status == 200) {
        if (res.data.code == "200") {
          setData(res.data.obj);
          setAdressPoint({
            GPS_Lati: res.data.obj.address.GPS_lati,
            GPS_long: res.data.obj.address.GPS_long,
            city: res.data.obj.address.city.name || "",
            district: res.data.obj.address.district.name || "",
            subDistrict: res.data.obj.address.subDistrict.name || "",
          })
          setItems(res.data.obj.reliefInformations);
          return;
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
  useEffect(() => {
    callGetReliefPointDetail();
  }, [item])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ height: height * 0.07 }}>
        <HeaderContainer
          flexRight={0}
          flexCenter={10}
          isBackReLoad="ReliefPoint"
          centerEl={(
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#FFF" }}>Cập nhật điểm cứu trợ</Text>
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
            id: data?.id,
            open_Hour_time: (!isNull(data?.open_time) && !isUndefined(data?.open_time)) ? data?.open_time.split(" ")[1] : "",
            close_Hour_time: (!isNull(data?.close_time) && !isUndefined(data?.close_time)) ? data?.close_time.split(" ")[1] : "",
            open_Date_time: (!isNull(data?.open_time) && !isUndefined(data?.open_time)) ? data?.open_time.split(" ")[0] : "",
            close_Date_time: (!isNull(data?.close_time) && !isUndefined(data?.close_time)) ? data?.close_time.split(" ")[0] : "",
            status: data?.status || "",
            name: data?.name || "",
            description: data?.description || "",
          }}
          validationSchema={update}
          enableReinitialize
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
            console.log("body", body);
            callUpdateReliefPoint(body);
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
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 3 }}>
                    <Field
                      component={DateTimePicker}
                      name="open_Date_time"
                      horizontal
                      placeholder="Mở cửa"
                      styleTitle={{ width: 110 }}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Field
                      component={TimePicker}
                      name="open_Hour_time"
                      horizontal
                      placeholder="Mở cửa"
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
                      placeholder="Đóng cửa"
                      styleTitle={{ width: 110 }}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Field
                      component={TimePicker}
                      name="close_Hour_time"
                      horizontal
                      placeholder="Mở cửa"
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
    </ScrollView >
  );
}

export default UpdateReliefPoint;