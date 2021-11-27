import { Field, Formik } from "formik";
import React, { createRef, useEffect, useState } from "react";
import {
  SafeAreaView, Switch, Text, View
} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { apiPlaceDetailByLongLat } from "../../ApiFunction/PlaceAPI";
import { apiGetSOS, apiUpdateSOS } from "../../ApiFunction/SOS";
import ButtonCustom from "../../Components/ButtonCustom";
import ContainerField from "../../Components/ContainerField";
import HeaderContainer from "../../Components/HeaderContainer";
import Input from "../../Components/Input";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../Constrants/DataGlobal";
import { height } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import styles from "../AddLocation/styles";
import MapView from "./components/MapView";
const SOS = ({ navigation }) => {
  const [adressPoint, setAdressPoint] = useState<any>({
    GPS_Lati: "21.00554564179488",
    GPS_long: "105.51689565181731",
    city: "",
    district: "",
    subDistrict: "",
  })
  const [sosInfor, setSosInfor] = useState<any>({});
  const [items, setItems] = useState<any>([]);
  const formikRef = createRef<any>();


  const getDetailPlace = (long: string | number, lat: string | number) => {
    try {
      apiPlaceDetailByLongLat(long, lat).then((response) => {
        if (response.status == 200) {
          const place = response?.data?.results[0]?.address_components;
          setAdressPoint({
            city: place[place?.length - 1]?.long_name,
            province: place[place?.length - 2]?.long_name,
            district: place[place?.length - 2]?.long_name,
            subDistrict: place[place?.length - 3]?.long_name,
            GPS_Lati: lat + "",
            GPS_long: long + "",
          })
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (response) => {
        getDetailPlace(response.coords.longitude, response.coords.latitude)
      },
      (error) => { console.log("errorCurrentLocation", error) },
      {
        distanceFilter: 50,
      }
    )
  }
  console.log("address", adressPoint)
  const callCreatePoint = (body) => {
    apiUpdateSOS(body).then((res) => {
      console.log("update", res)
      if (res.status == 200) {
        if (res.data.code == "200") {
          Toast.show({
            type: "success",
            text1: "Cập nhật SOS thành công",
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
  const callGetSOS = () => {
    apiGetSOS().then((res) => {
      console.log("res", res)
      if (res.status == 200) {
        if (res.data.code == "200") {
          setSosInfor(res.data.obj);
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
    getCurrentLocation();
    callGetSOS();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: "7%" }}>
        <HeaderContainer
          flexRight={1}
          flexCenter={10}
          isBackNavigate={"Home"}
          centerEl={(
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#FFFF" }}>SOS</Text>
            </View>
          )}
          flexLeft={1}
        />
      </View>

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[{ width: "100%", height: height * 0.4, backgroundColor: "FFFF", padding: 1, borderRadius: 10, marginTop: 20 }, MainStyle.boxShadow]}>
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
            id: sosInfor?.id || "",
            status: sosInfor?.status || "",
            description: sosInfor?.description || "",
            level: sosInfor?.level + "" || "",
          }}
          enableReinitialize
          onSubmit={(values) => {
            const body = {
              ...values,
              status: values.status ? false : true,
              level: Number(values.level),
              address: {
                id: sosInfor.address?.id | 0,
                GPS_Lati: adressPoint.GPS_Lati,
                GPS_long: adressPoint.GPS_long,
                city: {
                  name: adressPoint.city,
                  code: "",
                },
                district: {
                  name: adressPoint.district,
                  code: "",
                },
                subDistrict: {
                  name: adressPoint.subDistrict,
                  code: "",
                },
              }
            }
            console.log("body", body);
            callCreatePoint(body);
          }}
        >
          {({ submitForm, errors, values, setFieldValue }) => (
            <View>
              <ContainerField title="Mức độ khẩn cấp">
                <Field
                  component={Input}
                  name="level"
                  horizontal
                  placeholder="Mức độ"
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
              <ContainerField title="Trạng thái SOS">
                <View style={{ flexDirection: "row" }}>
                  <Switch onChange={() => { setFieldValue('status', !values.status) }} style={{ width: 50, height: 50 }} value={values.status}></Switch>
                  <Text style={{ textAlign: "center", textAlignVertical: "center" }}>{values?.status ? "Bật" : "Tắt"}</Text>
                </View>
              </ContainerField>
              <ButtonCustom
                title={"Cập nhật"}
                styleTitle={{ color: "#FFF" }}
                styleContain={{ backgroundColor: "#F6BB57", marginTop: 30, color: "#FFFF" }}
                onPress={() => { submitForm() }} />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SOS;